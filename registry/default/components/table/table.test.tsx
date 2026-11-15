import React from "react"
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table } from "../table";

interface User {
  id: number;
  name: string;
  email: string;
}

const columns = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
];

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

describe("Table", () => {
  it("renders column headers", () => {
    render(<Table data={data} columns={columns} />);
    expect(screen.getByText("ID")).toBeDefined();
    expect(screen.getByText("Name")).toBeDefined();
    expect(screen.getByText("Email")).toBeDefined();
  });

  it("renders all data rows", () => {
    render(<Table data={data} columns={columns} />);
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("Bob")).toBeDefined();
  });

  it("shows empty state when data is empty", () => {
    render(<Table data={[]} columns={columns} />);
    expect(screen.getByText("No results.")).toBeDefined();
  });

  it("renders caption when provided", () => {
    render(<Table data={data} columns={columns} caption="User list" />);
    expect(screen.getByText("User list")).toBeDefined();
  });

  it("renders custom cell content via render function", () => {
    const customColumns = [
      { key: "name", header: "Name", render: (val: unknown) => <strong>{(val as string).toUpperCase()}</strong> },
    ];
    render(<Table data={data} columns={customColumns} />);
    expect(screen.getByText("ALICE")).toBeDefined();
  });

  it("uses semantic table elements", () => {
    const { container } = render(<Table data={data} columns={columns} />);
    expect(container.querySelector("table")).toBeDefined();
    expect(container.querySelector("thead")).toBeDefined();
    expect(container.querySelector("tbody")).toBeDefined();
    expect(container.querySelectorAll("th").length).toBe(3);
  });
});
