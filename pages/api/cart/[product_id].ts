import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]";

export default async function HANDLER(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ message: "Akses tidak diizinkan. Harap login terlebih dahulu." });
  }

  const user_id = session?.user?.id;
  const { product_id } = req.query;

  if (Array.isArray(product_id) || !product_id) {
    return res.status(400).json({ message: "Product_id tidak valid" });
  }

  const queryCartId = await sql`
          SELECT cart_id FROM carts WHERE user_id=${user_id};
  `;

  const cart_id = queryCartId.rows[0].cart_id;

  switch (req.method) {
    case "PUT":
      try {
        const { quantity: newQuantity } = req.body;

        if (!cart_id) {
          return res.status(400).json({ message: "cart tidak ditemukan" });
        }

        const stockChecking = await sql`
          SELECT stock FROM products WHERE product_id=${product_id}
        `;

        const stock = stockChecking.rows[0].stock;

        if (newQuantity > stock) {
          return res.status(400).json({ message: "stock tidak mencukupi" });
        }

        if (newQuantity > 0) {
          await sql`
          UPDATE cart_items SET quantity = ${newQuantity} WHERE cart_id=${cart_id} and product_id=${product_id}
        `;
        } else {
          await sql`
          DELETE FROM cart_items WHERE cart_id=${cart_id} and product_id=${product_id}
        `;
        }

        return res.status(200).json({ message: "sukses" });
      } catch (error) {}
      break;

    case "DELETE":
      if (session) {
        if (cart_id) {
          try {
            await sql`
            DELETE FROM cart_items WHERE product_id=${product_id};
          `;

            return res.status(200).json({ message: "sukses" });
          } catch (error) {
            return res
              .status(500)
              .json({ message: "Kegagalan di sisi server" });
          }
        }
      }
      break;

    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);

      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
