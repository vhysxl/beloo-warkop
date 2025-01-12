import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Navigation from "@/components/navbar";
import Footer from "@/components/footer";
import { Product } from "@/types/product";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  const handleOrderClick = () => {
    if (session) {
      router.push("/catalog/products");
    } else {
      router.push("/account/login");
    }
  };

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/featured");
        const result = await response.json();

        setFeaturedProducts(result);
      } catch (error) {
        return error;
      }
    };

    fetchFeaturedProducts();
  }, []);

  const renderFeaturedProducts = () => {
    return featuredProducts.map((product) => {
      return (
        <Card key={product.product_id}>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">{product.name}</h4>
            <p className="text-tiny uppercase font-bold">
              Rp {product.price.toLocaleString()}
            </p>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt={product.name}
              className="object-cover rounded-xl"
              height={400}
              src={product.image_url}
              width={500}
            />
          </CardBody>
          <CardFooter>
            <Button fullWidth color="warning" onPress={handleOrderClick}>
              Pesan Sekarang
            </Button>
          </CardFooter>
        </Card>
      );
    });
  };

  return (
    <div>
      <Navigation />
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#C5A572]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {session
                  ? `Selamat Datang Kembali, ${session.user?.name}!`
                  : "Selamat Datang di Warung Kopi Beloo"}
              </h1>
              <p className="max-w-[700px] md:text-xl">
                {session
                  ? "Siap untuk secangkir kopi lagi hari ini?"
                  : "Ngopi Ga Bikin Skibidi, Biar Makin Sigma fr fr no cap!"}
              </p>
              <Button color="warning" size="lg" onPress={handleOrderClick}>
                {session ? "Pesan Sekarang" : "Mulai Ngopi"}
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              {session ? "Rekomendasi Untukmu" : "Minuman Favorit"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderFeaturedProducts()}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#C5A572]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {session ? "Promo Khusus Untukmu" : "Ngopi cik"}
              </h2>
              <p className="max-w-[600px] text-white md:text-xl">
                {session
                  ? "Dapatkan diskon spesial untuk pembelian berikutnya!"
                  : "Nikmati berbagai promo menarik untuk pelanggan baru."}
              </p>
              <Button
                color="warning"
                size="lg"
                onPress={() =>
                  router.push(session ? "/promo" : "/account/register")
                }
              >
                {session ? "Lihat Promo" : "Daftar Sekarang"}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
