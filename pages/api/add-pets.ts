import { sql } from "@vercel/postgres";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    await sql`
            CREATE TABLE IF NOT EXISTS Pets (
                ID SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL,
                Owner VARCHAR(255) NOT NULL
            );
        `;

    const petName = request.query.petName as string;
    const ownerName = request.query.ownerName as string;

    if (!petName || !ownerName) throw new Error("Pet and owner names required");

    await sql`INSERT INTO Pets (Name, Owner) VALUES (${petName}, ${ownerName});`;
  } catch (error) {
    return response.status(500).json({ error: (error as Error).message });
  }

  const pets = await sql`SELECT * FROM Pets;`;

  return response.status(200).json({ pets });
}
