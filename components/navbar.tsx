import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import ThemeSwitcher from "./switcher";
import { CircleUser } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Order Online", href: "/catalog/products" },
    { name: "About Us", href: "/about/about" },

  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll isBordered isBlurred={false}>
      {/* First NavbarContent with brand */}
      <NavbarContent>
        <NavbarBrand>
          <p className="font-bold text-inherit">BELOO_WARKOP</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Middle NavbarContent with navigation items */}
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
        <NavbarItem>
          <Button as={Link} className="hidden sm:flex bg-[#C5A572] bg-opacity-50" href="/account/login" radius="full" variant="flat" startContent={<CircleUser />}>
            Account
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu >
        <div className=" space-y-3">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link
                className="w-full text-right my-2 font-bold  transition-colors duration-200"
                href={item.href}
                size="lg"
                color="foreground"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
        <hr className="bg-neutral-600 mt-4 dark:bg-white"/>
        <Button
          as={Link}
          color="warning"
          className="w-full py-3 font-semibold  shadow-lg transition duration-200 mt-2"
          href="/account/login"
          >
          Loginkan Le
        </Button>

      </NavbarMenu>


    </Navbar>
  );
}