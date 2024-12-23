"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import { CircleUser, LogOut, Settings, User } from "lucide-react";

import ThemeSwitcher from "./switcher";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: session } = useSession();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Order Online", href: "/catalog/products" },
    { name: "About Us", href: "/about/about" },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      isBlurred={false}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">BELOO_WARKOP</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            aria-current="page"
            className="text-[#C5A572]"
            href="/catalog/products"
          >
            Order Online
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about/about">
            Tentang Kami
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          {session ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  className="bg-[#C5A572] bg-opacity-50"
                  radius="full"
                  variant="flat"
                >
                  <span>{session.user?.name?.split(" ")[0]}</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu actions" color="warning">
                <DropdownItem
                  key="profile"
                  startContent={<User className="w-4 h-4" />}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={<Settings className="w-4 h-4" />}
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={<LogOut className="w-4 h-4" />}
                  onPress={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              as={Link}
              className="bg-[#C5A572] bg-opacity-50"
              href="/account/login"
              radius="full"
              startContent={<CircleUser />}
              variant="flat"
            >
              Account
            </Button>
          )}
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full text-lg py-2 font-semibold"
              color={item.name === "Order Online" ? "warning" : "foreground"}
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          {session ? (
            <>
              <Link className="w-full text-lg py-2" color="foreground" href="/">
                Profile
              </Link>
              <Link className="w-full text-lg py-2" color="foreground" href="/">
                Settings
              </Link>
              <Button
                className="w-full py-2 font-semibold mt-2"
                color="danger"
                onPress={handleLogout}
              >
                Log Out
              </Button>
            </>
          ) : (
            <Button
              as={Link}
              className="w-full py-2 font-semibold mt-2"
              color="warning"
              href="/account/login"
            >
              Loginkan Le
            </Button>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
