import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";

import { authOptions } from "./auth/[...nextauth]";

export default async function CART(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      try {
        if (!session?.user?.id) {
          return res
            .status(401)
            .json({ message: "Unauthorized, please log in" });
        }

        const user_id = session.user.id;

        const cart_id = await sql`
        SELECT cart_id FROM carts WHERE user_id=${user_id}`;

        if (cart_id.rowCount === 0) {
          return res.status(400).json({ message: "cart kosong" });
        }

        if (cart_id.rowCount !== null && cart_id.rowCount > 0) {
          const result = await sql`
          SELECT * FROM products JOIN cart_items
          ON products.product_id = cart_items.product_id WHERE cart_id = ${cart_id.rows[0].cart_id};`;

          return res.status(200).json(result.rows);
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "kesalahan di sisi server ", error });
      }

    case "POST":
      try {
        const { product_id, quantity } = req.body;

        if (!session?.user?.id) {
          return res
            .status(401)
            .json({ message: "Unauthorized, please log in" });
        }

        const user_id = session.user.id;

        const existingCart = await sql`
          SELECT * FROM carts where user_id=${user_id};
        `;

        let cart_id;

        if (existingCart.rowCount === 0) {
          const newCart = await sql`
          INSERT INTO carts (user_id) VALUES (${user_id}) RETURNING cart_id`;

          cart_id = newCart.rows[0].cart_id;
        } else {
          cart_id = existingCart.rows[0].cart_id;
        }

        const existingItem = await sql`
          SELECT * FROM cart_items
          WHERE cart_id=${cart_id} AND product_id=${product_id}
        `;

        const stockItem = await sql`
          SELECT stock FROM products 
          WHERE product_id=${product_id}
        `;

        if (existingItem.rowCount === 0 && stockItem.rows[0].stock > 0) {
          await sql` INSERT INTO cart_items (cart_id, product_id, quantity)
          VALUES (${cart_id}, ${product_id}, ${quantity})`;
        } else if (
          existingItem.rowCount !== null &&
          existingItem.rowCount > 0
        ) {
          const existingQuantity = existingItem.rows[0].quantity;

          if (stockItem.rows[0].stock >= quantity + existingQuantity) {
            await sql`
              UPDATE cart_items
              SET quantity=${existingQuantity + quantity}
              WHERE cart_id=${cart_id} AND product_id=${product_id}`;
          }
        }

        return res.status(201).json({});
      } catch (error) {
        return res
          .status(500)
          .json({ message: "terjadi kesalahan di server", error });
      }
  }
}
