import { Button, Card, CardBody, CardHeader, Input, Link } from "@nextui-org/react";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import Navigation from '@/components/navbar'

export default function Register() {
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
          <CardHeader className="flex flex-col items-center pb-0 pt-6 px-4 mb-2">
            <motion.h1
              className="text-2xl font-bold"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              Bergabung dengan Keluarga Beloo
            </motion.h1>
          </CardHeader>
          <CardBody className="px-6 py-4">
            <form className="flex flex-col gap-4">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Input
                  label="Nama"
                  placeholder="Masukkan nama Anda"
                  type="text"
                  className="max-w-full"
                />
              </motion.div>
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
                  label="No Telepon"
                  placeholder="No Telepon"
                  type="phone"
                  className="max-w-full"
                />
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Input
                  label="Kata Sandi"
                  placeholder="Buat kata sandi"
                  type="password"
                  className="max-w-full"
                />
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Input
                  label="Konfirmasi Kata Sandi"
                  placeholder="Konfirmasi kata sandi Anda"
                  type="password"
                  className="max-w-full"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button color="primary" className="bg-[#C5A572] text-white w-full">
                  Daftar
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
                startContent={<FaGoogle />}
                className="w-full bg-white text-black border border-gray-300"
              >
                Daftar dengan Google
              </Button>
            </motion.div>
            <motion.p
              className="mt-4 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Sudah punya akun?{" "}
              <Link href="/account/login" className="text-[#C5A572] font-semibold">
                Masuk di sini
              </Link>
            </motion.p>
          </CardBody>
        </Card>
      </motion.div>
    </>
  );
}
