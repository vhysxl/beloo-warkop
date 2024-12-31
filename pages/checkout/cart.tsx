"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ShoppingCart, LogIn } from "lucide-react";

import Navigation from "@/components/navbar";
import { useCart } from "@/contexts/cartContext";
import { Product } from "@/types/product";
import { useCartApi } from "@/hooks/useCartApi";
import Footer from "@/components/footer";

export default function CartPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { state, dispatch } = useCart();
  const { handleGetCart, handleQuantityChange, handleCartDeletion } =
    useCartApi();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      const fetchCart = async () => {
        try {
          const data = await handleGetCart();

          dispatch({
            type: "SET_CART",
            payload: data,
          });
        } catch (error) {
          // Error handling remains unchanged
        } finally {
          setIsLoading(false);
        }
      };

      fetchCart();
    } else {
      setIsLoading(false);
    }
  }, [session, dispatch]);

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 text-center">
            <div>
              <ShoppingCart className="mx-auto h-16 w-16 text-warning" />
              <h2 className="mt-6 text-3xl font-extrabold">Login Diperlukan</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Anda perlu login terlebih dahulu untuk menambahkan barang ke
                keranjang 🛒
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <Link href="/account/login">
                <Button
                  className="w-full flex items-center justify-center"
                  size="lg"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Login Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const removeFromCart = async (product: Product) => {
    await handleCartDeletion(product.product_id);

    dispatch({
      type: "REMOVE_ITEM",
      payload: product.product_id,
    });
  };

  const updateQuantity = async (product: Product, newQuantity: number) => {
    if (newQuantity === 0) {
      handleQuantityChange(product.product_id, 0);
      removeFromCart(product);
    } else {
      await handleQuantityChange(product.product_id, newQuantity);

      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { ...product, quantity: newQuantity },
      });
    }
  };

  const calculateTotal = () => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <div className="min-h-screen ">
      <Navigation />
      <main className="py-16 min-h-screen ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold mb-8">Keranjang Belanja</h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner color="warning" size="lg" />
            </div>
          ) : state.items.length === 0 ? (
            <div className="rounded-2xl shadow-sm p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6">
                <svg
                  className="w-full h-full "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semiboldmb-2">
                Keranjang Anda Kosong
              </h2>
              <p className="mb-6">
                Mulai belanja dan tambahkan produk ke keranjang Anda
              </p>
              <Button
                className="font-semibold"
                color="warning"
                size="lg"
                onPress={() => router.push("/catalog/products")}
              >
                Lihat Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="rounded-2xl shadow-sm overflow-hidden border border-neutral-300 dark:border-none">
                <Table
                  aria-label="Cart items"
                  classNames={{
                    wrapper: "shadow-none",
                    th: "font-semibold",
                    td: "py-4",
                  }}
                >
                  <TableHeader>
                    <TableColumn>PRODUK</TableColumn>
                    <TableColumn>NAMA</TableColumn>
                    <TableColumn>HARGA</TableColumn>
                    <TableColumn>JUMLAH</TableColumn>
                    <TableColumn>TOTAL</TableColumn>
                    <TableColumn>AKSI</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {state.items.map((item) => (
                      <TableRow
                        key={item.product_id}
                        className={
                          item.stock === 0 ? "opacity-50" : "opacity-100"
                        }
                      >
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden">
                              <Image
                                alt={item.name}
                                className="w-12 h-12 object-cover"
                                src={item.image_url}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            Rp {item.price.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="inline-flex items-center rounded-lg border">
                            <Button
                              isIconOnly
                              className="rounded-none"
                              isDisabled={item.stock === 0}
                              variant="light"
                              onPress={() => {
                                if (item.quantity === 0) {
                                  updateQuantity(item, 0);
                                } else if (item.quantity > 0) {
                                  updateQuantity(item, item.quantity - 1);
                                }
                              }}
                            >
                              -
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {item.stock > 0
                                ? item.quantity
                                : (item.quantity = 0)}
                            </span>
                            <Button
                              isIconOnly
                              className="rounded-none"
                              isDisabled={item.stock === 0}
                              variant="light"
                              onPress={() =>
                                updateQuantity(item, item.quantity + 1)
                              }
                            >
                              +
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            {item.stock > 0 ? (
                              `Rp ${(item.price * item.quantity).toLocaleString()}`
                            ) : (
                              <span className="text-danger">Stok Habis</span>
                            )}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            isIconOnly
                            color="danger"
                            variant="light"
                            onPress={() => removeFromCart(item)}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </svg>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Catatan Pesanan
                  </h3>
                  <textarea
                    className="w-full h-32 p-3 border-black rounded-lg resize-none"
                    placeholder="Tambahkan catatan untuk pesanan Anda..."
                  />
                </div>

                <div className="rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Ringkasan Pesanan
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium">
                        Rp {calculateTotal().toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold text-xl">
                          Rp {calculateTotal().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    fullWidth
                    className="font-semibold"
                    color="warning"
                    size="lg"
                    onPress={() => router.push("/checkout")}
                  >
                    Lanjutkan ke Pembayaran
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
