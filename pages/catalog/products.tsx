"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Spinner,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Navigation from "@/components/navbar";
import { ProductCategory } from "@/types/category";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/cartContext";
import { useCartApi } from "@/hooks/useCartApi";
import Footer from "@/components/footer";

const groupProductsByCategory = (products: Product[]) => {
  return products.reduce(
    (acc, product) => {
      const category = product.category;

      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);

      return acc;
    },
    {} as Record<string, Product[]>,
  );
};

export default function ProductsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>("Minuman");
  const [groupedProducts, setGroupedProducts] = useState<
    Record<string, Product[]>
  >({});
  const { dispatch } = useCart();
  const { handleAddToCart } = useCartApi();
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const result = await response.json();

      const grouped = groupProductsByCategory(result);

      setGroupedProducts(grouped);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = async (product: Product) => {
    if (product.stock > 0) {
      try {
        await handleAddToCart(product.product_id, 1);

        dispatch({
          type: "ADD_ITEM",
          payload: product,
        });
      } catch (error) {}
    } else {
      alert("stock Habis");
    }
  };

  const renderProducts = (category: ProductCategory) => {
    const products = groupedProducts[category] || [];

    if (products.length === 0) {
      return <p>Produk tidak ditemukan untuk kategori ini.</p>;
    }

    return products.map((product) => {
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
              height={300}
              src={product.image_url}
              width={300}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <p className="text-default-500">{product.description}</p>
            {product.stock ? (
              <Button
                fullWidth
                className="mt-4"
                color="warning"
                onPress={
                  session
                    ? () => addToCart(product)
                    : () => router.push("/account/login")
                }
              >
                Pesan Sekarang
              </Button>
            ) : (
              <Button fullWidth isDisabled className="mt-4" color="default">
                Produk Habis
              </Button>
            )}
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
                Menu Warkop Beloo
              </h1>
              <p className="max-w-[700px] md:text-xl">
                PESAN SEKARANG DATANG TINGGAL ENJOY! 😋
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs
              aria-label="Product categories"
              className="mb-8"
              color="warning"
              selectedKey={selectedCategory}
              onSelectionChange={(key) =>
                setSelectedCategory(key as ProductCategory)
              }
            >
              <Tab key="minuman" title="Minuman" />
              <Tab key="makanan" title="Makanan" />
            </Tabs>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner color="warning" size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {renderProducts(selectedCategory)}
              </div>
            )}
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#C5A572] text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Crafted with Care, Served with Love 🤗❤️.
              </h2>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
