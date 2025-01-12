"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Package, Clock, CircleDollarSign, CreditCard } from "lucide-react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import Navigation from "@/components/navbar";
import Footer from "@/components/footer";
import { Order } from "@/types/order";
import { OrderItem } from "@/types/order";

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const id = params?.id;

  useEffect(() => {
    if (!session) {
      router.push("/account/login");
    }
  }, [session]);

  useEffect(() => {
    if (!id) {
      router.push("/orders");

      return;
    }
    fetchOrderItems();
    fetchOrder();
  }, [id, session]);

  const fetchOrderItems = async () => {
    const response = await fetch(`/api/orders-item/${id}`);
    const data = await response.json();

    if (data) {
      setOrderItems(data);

      return;
    }

    setError("gagal fecth items");

    return;
  };

  const fetchOrder = async () => {
    const response = await fetch(`/api/orders/${id}`);
    const data = await response.json();

    if (data) {
      setOrder(data);

      return;
    }

    setError("gagal fecth items");

    return;
  };

  useEffect(() => {
    if (id) {
      fetchOrderItems();
      fetchOrder();
    }
  }, [session]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      {error && <p>{error}</p>}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="mb-4 sm:mb-8">
            <Button
              className="mb-4"
              size="sm"
              variant="flat"
              onPress={() => router.push("/orders")}
            >
              Kembali ke Pesanan
            </Button>
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">
              Detail Pesanan #{order?.order_id}
            </h1>
            <p className="text-default-500">
              Dibuat pada{" "}
              {order?.created_at &&
                new Date(order.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Status Pesanan</h3>
              </div>
              <Chip className="capitalize" color="primary" variant="flat">
                {order?.status}
              </Chip>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <CreditCard className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Metode Pembayaran</h3>
              </div>
              <p className="capitalize">{order?.method || "Belum dipilih"}</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <CircleDollarSign className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Total Pembayaran</h3>
              </div>
              <p className="font-semibold">
                Rp {order?.total_amount && order?.total_amount}
              </p>
            </Card>
          </div>

          <Card className="w-full mb-6">
            <div className="overflow-x-auto">
              <Table
                removeWrapper
                aria-label="Order items table"
                className="min-h-[200px]"
              >
                <TableHeader>
                  <TableColumn>PRODUK</TableColumn>
                  <TableColumn>HARGA</TableColumn>
                  <TableColumn>JUMLAH</TableColumn>
                  <TableColumn>TOTAL</TableColumn>
                </TableHeader>
                <TableBody>
                  {orderItems?.map((item) => (
                    <TableRow key={item.order_item_id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.product_name}</p>
                          <p className="text-small">ID: {item.product_id}</p>
                        </div>
                      </TableCell>
                      <TableCell>Rp {item.price_at_time}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <span className="font-medium">
                          Rp {item.price_at_time * item.quantity}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <p>Rp {order?.total_amount}</p>
              </div>
            </div>
          </Card>

          <Card className="mt-4 sm:mt-6 p-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">
                  Status Pemrosesan
                </h3>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
