import React from "react";
import { Link } from "@nextui-org/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 md:px-6 border-t">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-500">© 2024 Warkop Beloo</p>
        <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
          <Link href="/about/about" size="sm">
            Tentang Kami
          </Link>
        </div>
      </div>
    </footer>
  );
}
