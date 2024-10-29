import React from 'react'
import Navigation from '@/components/navbar'

import { Button, Card, CardBody, CardFooter, CardHeader, Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

export default function index() {
  return (
    <div>
      <Navigation />
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#C5A572]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Selamat Datang di Warung Kopi Beloo
              </h1>
              <p className="max-w-[700px]  md:text-xl">
                Ngopi Ga Bikin Skibidi, Biar Makin Sigma fr fr no cap!
              </p>
              <Button color="warning" size="lg">
                Pesan Sekarang
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Minuman Favorit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">Vanilla Latte</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Kopi Susu Gula Aren"
                    className="object-cover rounded-xl"
                    src=""
                    width={300}
                    height={300}
                  />
                </CardBody>
                <CardFooter>
                  <Button fullWidth color="warning">
                    Pesan Sekarang
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">Kopi Beloo</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Es Kopi Pokat"
                    className="object-cover rounded-xl"
                    src=""
                    width={300}
                    height={300}
                  />
                </CardBody>
                <CardFooter>
                  <Button fullWidth color="warning">
                    Pesan Sekarang
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">Kopi Maxwin</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Kopi Luwak"
                    className="object-cover rounded-xl"
                    src=""
                    width={300}
                    height={300}
                  />
                </CardBody>
                <CardFooter>
                  <Button fullWidth color="warning">
                    Pesan Sekarang
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#C5A572] text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ngopi cik
              </h2>
              <p className="max-w-[600px] text-amber-100 md:text-xl">
                Isi apa cok w bingung 
              </p>
              <Button color="warning" size="lg">
                Ini ntar ke anu
              </Button>
            </div>
          </div>
        </section>
        
      </main>
      <footer className="w-full py-6 px-4 md:px-6 border-t">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2024 Warkop Beloo
          </p>
          <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link href="#" size="sm">
              Kontak
            </Link>
            <Link href="#" size="sm">
              Alamat
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
