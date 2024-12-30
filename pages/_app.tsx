import type { AppProps } from "next/app";

import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/system";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import { CartProvider } from "@/contexts/cartContext";
import CartInitializer from "@/components/cartInitializer";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <CartProvider>
            <CartInitializer />
            <Component {...pageProps} />
          </CartProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
