import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";

import { authOptions } from "./auth/[...nextauth]";

export default async function CART(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  const user_id = session?.user?.id;

  try {
    let cartQuery =
      await sql`SELECT cart_id FROM carts WHERE user_id=${user_id}`;

    let cart_id = cartQuery!.rowCount! > 0 ? cartQuery.rows[0].cart_id : null;

    if (!cart_id && req.method === "POST") {
      const newCart = await sql`
        INSERT INTO carts (user_id) VALUES (${user_id}) RETURNING cart_id;
      `;

      cart_id = newCart.rows[0].cart_id;
    }

    switch (req.method) {
      case "GET":
        if (!cart_id) {
          return res.status(200).json([]);
        }

        const result = await sql`
          SELECT products.*, cart_items.quantity
          FROM products
          JOIN cart_items ON products.product_id = cart_items.product_id
          WHERE cart_items.cart_id = ${cart_id};
        `;

        return res.status(200).json(result.rows);

      case "POST":
        if (!session) {
          return res.status(400).json({
            message: "Akses tidak diizinkan. Harap login terlebih dahulu.",
          });
        }

        const { product_id, quantity } = req.body;

        if (!product_id || !quantity || quantity < 1) {
          return res.status(400).json({ message: "Invalid input data" });
        }

        const stockItem = await sql`
          SELECT stock FROM products WHERE product_id=${product_id};
        `;

        if (stockItem.rowCount === 0) {
          return res.status(404).json({ message: "Product tidak ditemukan" });
        }

        const stock = stockItem.rows[0].stock;

        if (stock < quantity) {
          return res.status(400).json({ message: "Stok tidak mencukupi" });
        }

        const existingItem = await sql`
          SELECT * FROM cart_items
          WHERE cart_id=${cart_id} AND product_id=${product_id};
        `;

        if (existingItem.rowCount === 0) {
          await sql`
            INSERT INTO cart_items (cart_id, product_id, quantity)
            VALUES (${cart_id}, ${product_id}, ${quantity});
          `;
        } else {
          const existingQuantity = existingItem.rows[0].quantity;

          if (stock >= quantity + existingQuantity) {
            await sql`
              UPDATE cart_items
              SET quantity=${existingQuantity + quantity}
              WHERE cart_id=${cart_id} AND product_id=${product_id};
            `;
          } else {
            return res.status(400).json({ message: "Stok tidak cukup" });
          }
        }

        return res
          .status(201)
          .json({ message: "Item berhasil ditambahkan ke cart" });

      default:
        res.setHeader("Allow", ["GET", "POST"]);

        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
