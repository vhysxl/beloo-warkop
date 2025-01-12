import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const userid = req.query.id;

    try {
      const result = await sql`
        select created_at, email, nama, userid, telepon from users where userid=${userid as string}
      `;

      if (result.rowCount === null || result.rowCount < 0) {
        return res.status(401).json({ error: "Data tidak ditemukan" });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      return res.status(500).json({ error: "Terjadi kesalahan di server" });
    }
  }

  if (req.method === "PUT") {
    const userid = req.query.id;
    const { nama, telepon, email } = req.body;

    try {
      try {
        await sql`
        UPDATE users set nama=${nama}, telepon=${telepon}, email=${email} WHERE userid=${userid as string}
      `;

        return res.status(200).json({ message: "berhasil mengubah data" });
      } catch (error) {
        return res
          .status(400)
          .json({ error: "email sudah terdaftar atau data tidak valid" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Terjadi kesalahan di server" });
    }
  }
}
