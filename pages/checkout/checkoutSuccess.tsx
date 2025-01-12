"use client";

import React from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/router";

import Navigation from "@/components/navbar";
import Footer from "@/components/footer";

export default function CheckoutSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <CheckCircle className="text-success" size={24} />
              <h2 className="text-lg font-bold">Checkout Berhasil</h2>
            </CardHeader>
            <CardBody>
              <p className="text-base mb-4">
                Terima kasih telah melakukan pemesanan! Silakan lakukan
                pembayaran ke rekening berikut:
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="font-bold">Bank:</p>
                  <p>BCA</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Nomor Rekening:</p>
                  <p>57931456987</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Atas Nama:</p>
                  <p>Nanang</p>
                </div>
              </div>
              <p className="text-base mt-4">
                Harap lakukan konfirmasi pembayaran setelah transfer dengan
                menghubungi customer service kami di +6285156077909.
              </p>
              <Button
                fullWidth
                className="mt-6"
                color="success"
                size="lg"
                onPress={() => router.push("/")}
              >
                Kembali ke Beranda
              </Button>
            </CardBody>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
