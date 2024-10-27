import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import ThemeSwitcher from "./switcher";
import { CircleUser } from "lucide-react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Home",
    "Order Online",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
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

      {/* Last NavbarContent with login/signup and menu toggle */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} className="hidden lg:flex bg-[#C5A572] bg-opacity-50" href="/account/login" radius="full" variant="flat" startContent={<CircleUser />}>
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

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className={`w-full text-right ${index === 1
                ? "text-[#C5A572]"
                : index === menuItems.length - 1
                  ? "text-danger"
                  : "text-foreground"
                }`}
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}