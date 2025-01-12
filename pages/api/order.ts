import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";

import { authOptions } from "./auth/[...nextauth]";

import { Product } from "@/types/product";

export default async function ORDER(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const userid = session?.user?.id || null;

  if (!session) {
    return res
      .status(400)
      .json({ message: "Akses tidak diizinkan. Harap login terlebih dahulu." });
  }

  switch (req.method) {
    case "POST":
      try {
        const { cartItems, total, user_id, telepon, nama, note, method, type } =
          req.body;

        if (!cartItems || !total || !telepon || !nama || !method || !type) {
          return res
            .status(400)
            .json({ message: "Data tidak valid, tidak bisa membuat order" });
        }
        if (user_id != userid) {
          return res.status(400).json({ message: "Data user tidak valid" });
        }

        try {
          const create_order = await sql`
            INSERT INTO orders (user_id, total_amount, notes, name, phone, method, order_type) VALUES
            (${user_id}, ${total}, ${note}, ${nama}, ${telepon}, ${method}, ${type}) RETURNING order_id
          `;

          const order_id = create_order.rows[0].order_id;

          const orderItems = cartItems.map((product: Product) => ({
            order_id,
            product_id: product.product_id,
            quantity: product.quantity,
            price_at_time: product.price,
            product_name: product.name,
          }));

          sql.query(
            `INSERT INTO order_items (order_id, product_id, quantity, price_at_time, product_name)
             SELECT order_id, product_id, quantity, price_at_time, product_name
             FROM json_populate_recordset(NULL::order_items, $1)`,
            [JSON.stringify(orderItems)],
          );

          sql.query(
            `UPDATE products
             SET stock = stock - oi.quantity
             FROM json_populate_recordset(NULL::order_items, $1) as oi
             WHERE products.product_id = oi.product_id`,
            [JSON.stringify(orderItems)],
          );

          sql.query(
            `DELETE FROM cart_items
             WHERE cart_id IN (SELECT cart_id FROM carts
             WHERE user_id = ${user_id})`,
          );

          return res.status(200).json({ message: "Order berhasil dibuat" });
        } catch (error) {}
      } catch (error) {
        return res.status(500).json({ error: "terjadi kesalahan di server" });
      }
    case "GET":
      try {
        const result = await sql`
          SELECT * FROM orders WHERE user_id=${userid} ORDER BY created_at DESC
        `;

        if (result.rowCount !== null && result.rowCount > 0) {
          return res.status(200).json(result.rows);
        }

        return res.status(400).json({ error: "tidak ada order di akun ini" });
      } catch (error) {
        return res.status(500).json({ error: "terjadi kesalahan di server" });
      }
  }
}
