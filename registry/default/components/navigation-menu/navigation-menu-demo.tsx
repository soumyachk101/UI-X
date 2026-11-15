"use client";

import { NavigationMenu } from "./navigation-menu";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", children: [
    { label: "New Arrivals", href: "/products/new" },
    { label: "Best Sellers", href: "/products/popular" },
  ]},
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NavigationMenuDemo() {
  return (
    <div className="flex justify-center">
      <NavigationMenu items={menuItems} />
    </div>
  );
}
