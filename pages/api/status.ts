import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const result = await sql`
        SELECT status FROM cafe_status
      `;

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      return res.status(500).json({ error: "terjadi error di server" });
    }
  }
}
