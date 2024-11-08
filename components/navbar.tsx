'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import ThemeSwitcher from "./switcher";
import { CircleUser, LogOut, Settings, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: session } = useSession();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Order Online", href: "/catalog/products" },
    { name: "About Us", href: "/about/about" },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll isBordered isBlurred={false}>
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
          <Link href="/catalog/products" className="text-[#C5A572]" aria-current="page">
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
                  <span>{session.user?.name?.split(' ')[0]}</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu actions" color="warning">
                <DropdownItem key="profile" startContent={<User className="w-4 h-4" />}>
                  Profile
                </DropdownItem>
                <DropdownItem key="settings" startContent={<Settings className="w-4 h-4" />}>
                  Settings
                </DropdownItem>
                <DropdownItem key="logout" color="danger" startContent={<LogOut className="w-4 h-4" />} onPress={handleLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button as={Link} className="bg-[#C5A572] bg-opacity-50" href="/account/login" radius="full" variant="flat" startContent={<CircleUser />}>
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
              href={item.href}
              color={item.name === "Order Online" ? "warning" : "foreground"}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          {session ? (
            <>
              <p className="text-lg font-semibold mb-2">Hello, {session.user?.name}</p>
              <Link href="/" color="foreground" className="w-full text-lg py-2">
                Profile
              </Link>
              <Link href="/" color="foreground" className="w-full text-lg py-2">
                Settings
              </Link>
              <Button
                color="danger"
                className="w-full py-2 font-semibold mt-2"
                onPress={handleLogout}
              >
                Log Out
              </Button>
            </>
          ) : (
            <Button
              as={Link}
              color="warning"
              className="w-full py-2 font-semibold mt-2"
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