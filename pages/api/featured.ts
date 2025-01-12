import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const status = true;

      const result = await sql`
        SELECT * FROM products WHERE is_featured=${status}
      `;

      if (result) {
        return res.status(201).json(result.rows);
      }
    } catch (error) {
      return res.status(500).json({ message: "Terjadi kesalahan di server" });
    }
  } else {
    return res.status(405).end(`method ${req.method} tidak diizinkan`);
  }
}
