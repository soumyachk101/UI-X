import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Slider } from "../slider";

describe("Slider", () => {
  it("renders thumb", () => {
    render(<Slider defaultValue={[50]} />);
    const thumb = screen.getByRole("slider");
    expect(thumb).toBeTruthy();
  });

  it("has correct initial value", () => {
    render(<Slider defaultValue={[50]} />);
    const thumb = screen.getByRole("slider");
    expect(thumb).toHaveAttribute("aria-valuenow", "50");
  });

  it("supports range", () => {
    render(<Slider defaultValue={[20, 80]} />);
    const thumbs = screen.getAllByRole("slider");
    expect(thumbs).toHaveLength(2);
  });
});
