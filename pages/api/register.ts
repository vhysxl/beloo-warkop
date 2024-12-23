import { sql } from "@vercel/postgres";
import { NextApiResponse, NextApiRequest } from "next";
import bcrypt from "bcrypt";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { nama, email, telepon, password } = req.body;

    if (!nama || !email || !telepon || !password) {
      return res.status(400).json({ message: "Semua form harus di isi!" });
    }

    // cek existing user
    const existingUser = await sql`
            SELECT * FROM Users Where email = ${email}
        `;

    if (existingUser.rowCount !== null && existingUser.rowCount > 0) {
      if (existingUser.rows[0].provider === "google") {
        return res.status(400).json({
          message:
            "Email telah terdaftar menggunakan google, silakan login dengan google",
        });
      }

      return res.status(400).json({ message: "Email telah terdaftar 😥" });
    }

    // hash pw
    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
            INSERT INTO Users (nama, email, telepon, password, provider) 
            VALUES (${nama}, ${email}, ${telepon}, ${hashedPassword}, 'credentials');
        `;

    return res.status(201).json({ message: "user berhasil diregister" });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
