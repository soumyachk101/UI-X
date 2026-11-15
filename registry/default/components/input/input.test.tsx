import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../input";

describe("Input", () => {
  it("renders with type text by default", () => {
    render(<Input data-testid="input" />);
    const el = screen.getByTestId("input");
    expect(el.tagName).toBe("INPUT");
    expect(el).toHaveAttribute("type", "text");
  });

  it("accepts custom type", () => {
    render(<Input type="email" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("type", "email");
  });

  it("applies className", () => {
    render(<Input className="my-class" data-testid="input" />);
    expect(screen.getByTestId("input").className).toContain("my-class");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input disabled data-testid="input" />);
    expect(screen.getByTestId("input")).toBeDisabled();
  });
});
