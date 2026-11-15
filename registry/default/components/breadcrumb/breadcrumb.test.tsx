import React from "react"
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "../breadcrumb";

const items = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Laptops", active: true },
];

describe("Breadcrumb", () => {
  it("renders all breadcrumb items", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Products")).toBeDefined();
    expect(screen.getByText("Laptops")).toBeDefined();
  });

  it("renders nav element with aria-label", () => {
    render(<Breadcrumb items={items} />);
    const nav = screen.getByLabelText("Breadcrumb");
    expect(nav.tagName).toBe("NAV");
  });

  it("renders as ordered list", () => {
    render(<Breadcrumb items={items} />);
    const nav = screen.getByLabelText("Breadcrumb");
    const ol = nav.querySelector("ol");
    expect(ol).toBeDefined();
  });

  it("marks last item as current page", () => {
    render(<Breadcrumb items={items} />);
    const active = screen.getByText("Laptops");
    expect(active.getAttribute("aria-current")).toBe("page");
  });

  it("does not mark non-last items as current page", () => {
    render(<Breadcrumb items={items} />);
    const home = screen.getByText("Home");
    expect(home.getAttribute("aria-current")).toBeNull();
  });

  it("renders links for non-active items", () => {
    render(<Breadcrumb items={items} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0].getAttribute("href")).toBe("/");
    expect(links[1].getAttribute("href")).toBe("/products");
  });

  it("renders separators between items", () => {
    render(<Breadcrumb items={items} />);
    const separators = screen.getAllByText("/");
    expect(separators.length).toBe(items.length - 1);
  });
});
