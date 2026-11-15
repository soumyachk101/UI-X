import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "../skeleton";

describe("Skeleton", () => {
  it("renders with animate-pulse", () => {
    render(<Skeleton data-testid="sk" />);
    expect(screen.getByTestId("sk").className).toContain("animate-pulse");
  });

  it("applies className", () => {
    render(<Skeleton className="h-12 w-24" data-testid="sk" />);
    expect(screen.getByTestId("sk").className).toContain("h-12");
    expect(screen.getByTestId("sk").className).toContain("w-24");
  });

  it("is accessible (role=status)", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toBeTruthy();
  });

  it("supports custom dimensions", () => {
    render(<Skeleton className="h-24 w-32" data-testid="sk" />);
    const el = screen.getByTestId("sk");
    expect(el.className).toContain("h-24");
    expect(el.className).toContain("w-32");
  });
});
