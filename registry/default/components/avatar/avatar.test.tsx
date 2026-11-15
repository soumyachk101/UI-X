import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Avatar } from "../avatar";

describe("Avatar", () => {
  it("renders fallback when no src", () => {
    render(<Avatar alt="John Doe" />);
    expect(screen.getByText("JO")).toBeTruthy();
  });

  it("renders image when src is provided", () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("falls back on image error", () => {
    render(<Avatar src="https://broken.example/img.jpg" alt="User" fallback="FD" />);
    // After error, fallback should appear — img error triggers state update
    const img = screen.getByRole("img");
    img.dispatchEvent(new Event("error"));
    expect(screen.getByText("FD")).toBeTruthy();
  });
});
