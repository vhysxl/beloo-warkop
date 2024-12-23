"use client";

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
import { signIn, signOut, useSession } from "next-auth/react";

import Navigation from "@/components/navbar";
import StatusMessage from "@/components/statusmessage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState<{
    type: "" | "error" | "success" | "info";
    children: string;
  }>({ type: "", children: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setStatusMessage({
        type: "error",
        children: "Semua input harus diisi 😡",
      });
      setIsLoading(false);

      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setStatusMessage({ type: "error", children: result.error });
      } else {
        setStatusMessage({ type: "success", children: "Login berhasil! 🎉" });
      }
    } catch (err) {
      setStatusMessage({
        type: "error",
        children:
          err instanceof Error ? err.message : "Terjadi kesalahan sistem 😥",
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
        children: "Terjadi kesalahan saat login dengan Google 😥",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      setStatusMessage({ type: "success", children: "Logout berhasil 👋" });
    } catch (err) {
      setStatusMessage({
        type: "error",
        children: "Terjadi kesalahan saat logout 😥",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <StatusMessage type="info">Memuat...</StatusMessage>
      </div>
    );
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
              Selamat Datang Kembali Ke Warkop Beloo
            </motion.h1>
          </CardHeader>
          <CardBody className="px-6 py-4">
            {statusMessage.type && (
              <StatusMessage type={statusMessage.type}>
                {statusMessage.children}
              </StatusMessage>
            )}

            {session ? (
              <div className="flex flex-col items-center gap-4">
                <p>Logged in as {session.user?.email}</p>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    color="danger"
                    isLoading={isLoading}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </motion.div>
              </div>
            ) : (
              <>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Input
                      className="max-w-full"
                      isDisabled={isLoading}
                      label="Email"
                      placeholder="Masukkan email Anda"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Input
                      className="max-w-full"
                      isDisabled={isLoading}
                      label="Kata Sandi"
                      placeholder="Masukkan kata sandi Anda"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      {isLoading ? "Memproses..." : "Masuk"}
                    </Button>
                  </motion.div>
                </form>
                <div className="my-4 flex items-center">
                  <div className="flex-grow border-t border-gray-300" />
                  <span className="mx-4 text-sm">atau</span>
                  <div className="flex-grow border-t border-gray-300" />
                </div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    className="w-full bg-white text-black border border-gray-300"
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    startContent={<FaGoogle />}
                    onClick={handleGoogleSignIn}
                  >
                    Masuk dengan Google
                  </Button>
                </motion.div>
                <motion.p
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-sm"
                  initial={{ opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Belum punya akun?{" "}
                  <Link
                    className="text-[#C5A572] font-semibold"
                    href="/account/register"
                  >
                    Daftar di sini
                  </Link>
                </motion.p>
              </>
            )}
          </CardBody>
        </Card>
      </motion.div>
    </>
  );
}
