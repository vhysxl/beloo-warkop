import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Navigation from "@/components/navbar";
import StatusMessage from "@/components/statusmessage";

export default function Register() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!nama || !email || !telepon || !password || !confirmPassword) {
      setStatusMessage({
        type: "error",
        message: "Semua input harus diisi 😡",
      });
      setIsLoading(false);

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setStatusMessage({
        type: "error",
        message: "Email yang dimasukan tidak valid 🤦‍♂️",
      });
      setIsLoading(false);

      return;
    }

    if (confirmPassword !== password) {
      setStatusMessage({
        type: "error",
        message: "Password dan Konfirmasi tidak sesuai 🤦‍♂️",
      });
      setIsLoading(false);

      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama,
          email,
          telepon,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatusMessage({
          type: "error",
          message: data.message || "Terjadi kelasahan di server😥",
        });
        setIsLoading(false);

        return;
      }

      setStatusMessage({
        type: "success",
        message: "Registrasi berhasil! Silahkan login 🎉",
      });

      setNama("");
      setEmail("");
      setTelepon("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setStatusMessage({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan sistem 😥",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (err) {
      setStatusMessage({
        type: "error",
        message: "Terjadi kesalahan saat login dengan Google 😥",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <>
      <Navigation />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center min-h-screen p-4"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center pb-0 pt-6 px-4 mb-2">
            <motion.h1
              animate={{ scale: 1 }}
              className="text-2xl font-bold"
              initial={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              Bergabung dengan Keluarga Beloo
            </motion.h1>
          </CardHeader>
          <CardBody className="px-6 py-4">
            {statusMessage.type && (
              <StatusMessage type={statusMessage.type as "error" | "success"}>
                {statusMessage.message}
              </StatusMessage>
            )}

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Input
                  className="max-w-full"
                  isDisabled={isLoading}
                  label="Nama"
                  placeholder="Masukkan nama Anda"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Input
                  className="max-w-full"
                  isDisabled={isLoading}
                  label="Email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Input
                  className="max-w-full"
                  isDisabled={isLoading}
                  label="No Telepon"
                  placeholder="No Telepon"
                  type="tel"
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                />
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Input
                  className="max-w-full"
                  isDisabled={isLoading}
                  label="Kata Sandi"
                  placeholder="Buat kata sandi"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Input
                  className="max-w-full"
                  isDisabled={isLoading}
                  label="Konfirmasi Kata Sandi"
                  placeholder="Konfirmasi kata sandi Anda"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  className="bg-[#C5A572] text-white w-full"
                  isLoading={isLoading}
                  type="submit"
                >
                  {isLoading ? "Mendaftar..." : "Daftar"}
                </Button>
              </motion.div>
            </form>
            <div className="my-4 flex items-center">
              <div className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-sm">atau</span>
              <div className="flex-grow border-t border-gray-300" />
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="w-full bg-white text-black border border-gray-300"
                isDisabled={isLoading}
                startContent={<FaGoogle />}
                onClick={handleGoogleSignIn}
              >
                Daftar dengan Google
              </Button>
            </motion.div>
            <motion.p
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-sm"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Sudah punya akun?{" "}
              <Link
                className="text-[#C5A572] font-semibold"
                href="/account/login"
              >
                Masuk di sini
              </Link>
            </motion.p>
          </CardBody>
        </Card>
      </motion.div>
    </>
  );
}
