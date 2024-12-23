"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@nextui-org/button";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      isIconOnly
      aria-label="Toggle theme"
      className="rounded-full bg-white dark:bg-black hover:bg-[#C5A572] dark:hover:bg-[#C5A572] bg-opa transition-colors duration-500"
      variant="flat"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      ) : (
        <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      )}
    </Button>
  );
}

export default ThemeSwitcher;
