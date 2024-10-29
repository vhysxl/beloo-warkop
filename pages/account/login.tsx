import { Button, Card, CardBody, CardHeader, Input, Link } from "@nextui-org/react";
import React from 'react'
import Navigation from '@/components/navbar'
import { motion } from "framer-motion";


export default function login() {
  return (
    <>
      <Navigation />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-screen p-4"
      >
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center pb-0 pt-6 px-4 text-center mb-2">
            <motion.h1
              className="text-2xl font-bold"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              Selamat Datang Kembali Ke Warkop Beloo
            </motion.h1>
          </CardHeader>
          <CardBody className="px-6 py-4">
            <form className="flex flex-col gap-4">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Input
                  label="Email"
                  placeholder="Masukkan email Anda"
                  type="email"
                  className="max-w-full"
                />
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Input
                  label="Kata Sandi"
                  placeholder="Masukkan kata sandi Anda"
                  type="password"
                  className="max-w-full"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button color="primary" className="bg-[#C5A572] text-white w-full">
                  Masuk
                </Button>
              </motion.div>
            </form>
            <div className="my-4 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm">atau</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="w-full bg-white text-black border border-gray-300"
                endContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                    width="20" // Atur ukuran ikon
                    height="20"
                    className="ml-2"
                  >
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                  </svg>
                }
              >
                Masuk dengan Google
              </Button>

            </motion.div>
            <motion.p
              className="mt-4 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Belum punya akun?{" "}
              <Link href="/account/register" className="text-[#C5A572] font-semibold">
                Daftar di sini
              </Link>
            </motion.p>
          </CardBody>
        </Card>
      </motion.div>
    </>
  );
}
