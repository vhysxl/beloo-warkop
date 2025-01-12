"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { ShoppingBag, CreditCard } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Navigation from "@/components/navbar";
import Footer from "@/components/footer";
import { useCartApi } from "@/hooks/useCartApi";
import { Product } from "@/types/product";
import { useNote } from "@/contexts/noteContext";
import StatusMessage from "@/components/statusmessage";

export default function Checkout() {
  const router = useRouter();
  const { data: session } = useSession();
  const { handleGetCart } = useCartApi();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { note } = useNote();
  const [statusMessage, setStatusMessage] = useState<{
    type: "" | "error" | "success" | "info" | "errorOrder";
    children: string;
  }>({ type: "", children: "" });
  const [nama, setNama] = useState(
    session?.user?.name ? session.user.name : "",
  );
  const [telepon, setTelepon] = useState(
    session?.user?.telepon ? session.user.telepon.toString() : "",
  );
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [type, setType] = useState("makan_disini");

  useEffect(() => {
    if (!session) {
      router.push("/account/login");

      return;
    }
  }, [[session], router]);

  useEffect(() => {
    if (session) {
      const fetchCart = async () => {
        try {
          const data = await handleGetCart();
          const validStock = data.filter(
            (item: Product) => item.stock > 0 && item.stock >= item.quantity,
          );

          setCartItems(validStock);
        } catch (error) {
          //error
        }
      };

      fetchCart();
    }
  }, [session]);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleOrder = async () => {
    if (!session) {
      router.push("/account/login");

      return;
    }

    const user_id = session?.user?.id;

    if (!user_id) {
      setStatusMessage({
        type: "error",
        children: "Akun tidak valid, mohon login ulang",
      });

      return;
    }

    if (!nama || !telepon) {
      setStatusMessage({
        type: "errorOrder",
        children: "nama atau telepon tidak boleh kosong",
      });

      return;
    }

    if (!cartItems || cartItems.length === 0) {
      setStatusMessage({
        type: "error",
        children: "checkout error, tidak ada barang yang dibeli",
      });

      return;
    }

    const invalidItems = cartItems.filter(
      (item) => !item.product_id || !item.name || !item.quantity || !item.price,
    );

    if (invalidItems.length > 0) {
      setStatusMessage({
        type: "error",
        children: "Produk tidak valid",
      });

      return;
    }

    const invalidStocks = cartItems.filter(
      (item) =>
        item.stock <= 0 || item.quantity > item.stock || item.quantity <= 0,
    );

    if (invalidStocks.length > 0) {
      setStatusMessage({
        type: "error",
        children: "Stock barang tidak mencukupi atau habis",
      });

      return;
    }

    try {
      const order = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          total,
          user_id,
          telepon,
          nama,
          note,
          method: paymentMethod,
          type,
        }),
      });

      if (!order.ok) {
        const response = await order.json().catch(() => ({}));

        setStatusMessage({
          type: "error",
          children: response.message || "Terjadi kesalahan di server",
        });
      }

      const response = await order.json();

      setStatusMessage({
        type: "success",
        children: response.message || "Order dibuat",
      });
    } catch (error) {
      setStatusMessage({
        type: "error",
        children: "Terjadi kesalahan di server",
      });

      return;
    } finally {
      router.push("/checkout/checkoutSuccess");
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-bold">Informasi Penerima</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input
                  isRequired
                  label="Nama"
                  placeholder="Masukkan nama lengkap"
                  type="text"
                  value={nama}
                  variant="bordered"
                  onChange={(e) => setNama(e.target.value)}
                />
                <Input
                  isRequired
                  label="No. Telepon"
                  placeholder="Masukkan nomor telepon"
                  type="number"
                  value={telepon}
                  variant="bordered"
                  onChange={(e) => setTelepon(e.target.value)}
                />
                <Select
                  defaultSelectedKeys={["makan_disini"]}
                  label="Opsi Pesanan"
                  variant="bordered"
                  onChange={(e) => setType(e.target.value)}
                >
                  <SelectItem key="makan_disini" value="makan_disini">
                    Makan disini
                  </SelectItem>
                  <SelectItem key="takeaway" value="takeaway">
                    Takeaway
                  </SelectItem>
                </Select>
              </CardBody>
            </Card>
            {statusMessage.type === "errorOrder" && (
              <StatusMessage type={statusMessage.type as "errorOrder"}>
                {statusMessage.children}
              </StatusMessage>
            )}

            <Card>
              <CardHeader className="flex gap-2">
                <CreditCard className="text-warning" />
                <h2 className="text-lg font-bold">Metode Pembayaran</h2>
              </CardHeader>
              <CardBody>
                <RadioGroup
                  defaultValue="transfer"
                  onValueChange={(value) => setPaymentMethod(value)}
                >
                  <Radio value="transfer">Transfer Bank</Radio>
                  <Radio isDisabled value="ewallet">
                    E-Wallet
                  </Radio>
                </RadioGroup>
              </CardBody>
            </Card>
          </div>

          <Card className="h-fit">
            <CardHeader className="flex gap-2">
              <ShoppingBag className="text-warning" />
              <h2 className="text-lg font-bold">Ringkasan Pesanan</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product_id} className="flex justify-between">
                    <div>
                      <p>{item.name}</p>
                      <p className="text-sm text-gray-500">{item.quantity}x</p>
                    </div>
                    <p>Rp {formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}

                <hr />
                {note && (
                  <>
                    <div className="space-y-2">
                      <div className="flex flex-col justify-between">
                        <span className="text-xs font-bold text-neutral-500">
                          Note:
                        </span>
                        <p>{note}</p>
                      </div>
                    </div>
                    <hr />
                  </>
                )}
                <div className="space-y-2">
                  <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p>Rp {formatPrice(total)}</p>
                  </div>
                </div>

                <Button
                  fullWidth
                  color="warning"
                  size="lg"
                  onPress={() => {
                    handleOrder();
                  }}
                >
                  Beli sekarang
                </Button>
                {(statusMessage.type === "error" ||
                  statusMessage.type === "success") && (
                  <>
                    <hr />
                    <StatusMessage
                      type={statusMessage.type as "error" | "success"}
                    >
                      {statusMessage.children}
                    </StatusMessage>
                  </>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
