import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const result = await sql`
        select * from products;
      `;

      return res.status(200).json(result.rows);
    } catch (error) {
      return res.status(500).json({ message: "Terjadi kesalahan di Server" });
    }
  } else {
    return res.status(405).end(`method ${req.method} tidak diizinkan`);
  }
}
