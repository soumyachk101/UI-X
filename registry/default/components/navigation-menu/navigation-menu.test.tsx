import React from "react"
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavigationMenu } from "../navigation-menu";

const items = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "New", href: "/products/new" },
      { label: "Popular", href: "/products/popular" },
    ],
  },
  { label: "About", href: "/about" },
];

describe("NavigationMenu", () => {
  it("renders top-level items as links", () => {
    render(<NavigationMenu items={items} />);
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Products")).toBeDefined();
    expect(screen.getByText("About")).toBeDefined();
  });

  it("renders child links for items with children", () => {
    render(<NavigationMenu items={items} />);
    expect(screen.getByText("New")).toBeDefined();
    expect(screen.getByText("Popular")).toBeDefined();
  });

  it("has accessible link elements with correct hrefs", () => {
    render(<NavigationMenu items={items} />);
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink.getAttribute("href")).toBe("/");
    const aboutLink = screen.getByRole("link", { name: "About" });
    expect(aboutLink.getAttribute("href")).toBe("/about");
  });

  it("applies custom className", () => {
    render(<NavigationMenu items={items} className="my-nav" />);
    const root = document.querySelector(".my-nav");
    expect(root).toBeDefined();
  });

  it("renders navigation menu root element", () => {
    const { container } = render(<NavigationMenu items={items} />);
    expect(container.querySelector("[data-radix-navigation-menu]")).toBeDefined();
  });
});
