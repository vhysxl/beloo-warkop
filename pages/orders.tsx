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
import {
  Package,
  RefreshCcw,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";

import Navigation from "@/components/navbar";
import Footer from "@/components/footer";
import { Order } from "@/types/order";

export default function OrdersPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!session) {
      router.push("/account/login");
    }
  }, [session]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/order");
      const data = await response.json();

      if (!data) {
        setError("gagal fetch data order");

        return;
      }

      setOrders(data);
    };

    fetchOrders();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID").format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <RefreshCcw className="w-4 h-4" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "processing":
        return "primary";
      case "completed":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Pesanan Saya</h1>
            <p className="text-default-500">
              Kelola dan pantau status pesanan Anda
            </p>
          </div>
          {error && (
            <>
              <span>terjadi error</span>
            </>
          )}
          {orders.length === 0 ? (
            <Card className="w-full p-12">
              <div className="text-center">
                <Package className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Belum ada pesanan
                </h3>
                <p className="text-default-500 mb-6">
                  Anda belum memiliki pesanan apapun
                </p>
                <Button
                  size="lg"
                  onPress={() => router.push("/catalog/products")}
                >
                  Mulai Belanja
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="w-full">
              <div className="overflow-x-auto">
                {" "}
                {/* Add this wrapper */}
                <Table
                  removeWrapper
                  aria-label="Orders table"
                  className="min-h-[400px]"
                >
                  <TableHeader>
                    <TableColumn>Order ID</TableColumn>
                    <TableColumn>TANGGAL</TableColumn>
                    <TableColumn>TOTAL</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>AKSI</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.order_id}>
                        <TableCell>
                          <span className="font-medium">{order.order_id}</span>
                        </TableCell>
                        <TableCell>
                          {new Date(order.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            Rp {formatCurrency(order.total_amount)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Chip
                            className="capitalize text-xs sm:text-sm"
                            color={getStatusColor(order.status)}
                            startContent={getStatusIcon(order.status)}
                            variant="flat"
                          >
                            {order.status}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <Button
                            className="text-xs sm:text-sm"
                            size="sm"
                            variant="flat"
                            onPress={() =>
                              router.push(`/order/${order.order_id}`)
                            }
                          >
                            Lihat Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          )}

          <Card className="mt-8 p-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Rata-rata Waktu Pemrosesan
                </h3>
                <p className="text-default-500">
                  Pesanan Anda biasanya akan diproses dalam waktu 10-30 menit
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
