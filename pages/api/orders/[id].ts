import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      const result = await sql`
        SELECT * FROM orders WHERE order_id = ${id as string}
      `;

      if (result.rowCount !== null && result.rowCount > 0) {
        return res.status(200).json(result.rows[0]);
      }

      return res.status(400).json({ error: "order tidak ditemukan" });
    } catch (error) {
      return res.status(500).json({ error: "terjadi kesalahan di server" });
    }
  }
}
