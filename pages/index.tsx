import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MapPin, Clock, Phone } from "lucide-react";

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
        <Card key={product.product_id} className="w-full">
          <CardHeader className="pb-0 pt-2 px-4">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-lg">{product.name}</h4>
              <p className="text-sm uppercase font-bold">
                Rp {product.price.toLocaleString()}
              </p>
            </div>
          </CardHeader>
          <CardBody className="py-2">
            <Image
              alt={product.name}
              className="object-cover rounded-xl w-full h-[300px]"
              height={400}
              src={product.image_url}
              width={500}
            />
          </CardBody>
          <CardFooter className="px-4 py-2">
            <Button
              fullWidth
              className="font-medium"
              color="warning"
              onPress={handleOrderClick}
            >
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
      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh]" id="home">
          <Image
            alt="Coffee shop interior"
            className="object-cover"
            src="/hero-background.jpg"
          />
          <div className="absolute inset-0 backdrop-blur-sm">
            <div className="h-full flex flex-col justify-center items-center text-center p-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                {session
                  ? `Welcome Back, ${session.user?.name}!`
                  : "Welcome to Beloo Warkop"}
              </h2>
              <p className="text-xl md:text-2xl mb-8">
                {session
                  ? "Siap ngopi lagi hari ini?"
                  : "Where every sip tells a story"}
              </p>
              <Button
                className="font-semibold text-lg"
                size="lg"
                onPress={handleOrderClick}
              >
                {session ? "Order Now" : "Start Your Journey"}
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24" id="menu">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {session ? "Recommended For You" : "Featured Drinks"}
              </h2>
              <Divider className="my-4 max-w-[100px] mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {renderFeaturedProducts()}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24" id="about">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Our Coffee Story
                </h2>
                <p className="text-lg">
                  From bean to cup, we craft each drink with passion and
                  precision. Experience the difference of professionally roasted
                  and brewed coffee.
                </p>
                <Button
                  variant="bordered"
                  onPress={() => router.push("/about/about")}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24" id="contact">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="backdrop-blur-sm">
                <CardBody className="p-8 space-y-6">
                  <div className="flex items-center">
                    <MapPin className="mr-4 h-6 w-6" />
                    <p className="text-lg">
                      {" "}
                      Jl. Pangeran Jayakarta, Harapan Mulya, Kecamatan Medan
                      Satria, Kota Bekasi
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-4 h-6 w-6" />
                    <p className="text-lg">
                      Buka setiap hari: 07.00 - 22.00 WIB
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-4 h-6 w-6" />
                    <p className="text-lg">+62 123 4567 890</p>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
