import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeTruthy();
  });

  it("applies variant classes", () => {
    render(<Button variant="destructive">Delete</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-destructive");
  });

  it("is keyboard accessible", async () => {
    render(<Button>Focus me</Button>);
    const btn = screen.getByRole("button");
    btn.focus();
    expect(document.activeElement).toBe(btn);
  });

  it("handles click", async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<Button onClick={() => { clicked = true; }}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(clicked).toBe(true);
  });

  it("supports asChild pattern", () => {
    render(
      <Button asChild>
        <a href="/home">Go home</a>
      </Button>
    );
    expect(screen.getByRole("link", { name: /go home/i })).toBeTruthy();
  });
});
