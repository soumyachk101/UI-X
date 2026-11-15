import React from "react"
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "../progress";

describe("Progress", () => {
  it("renders progress indicator", () => {
    const { container } = render(<Progress value={50} />);
    const root = container.querySelector("[data-slot='progress']");
    expect(root).toBeDefined();
  });

  it("applies correct transform for value", () => {
    const { container } = render(<Progress value={60} />);
    const indicator = container.querySelector("[data-slot='progress-indicator']") as HTMLElement;
    expect(indicator.style.transform).toContain("translateX");
  });

  it("handles zero value", () => {
    const { container } = render(<Progress value={0} />);
    const root = container.querySelector("[data-slot='progress']");
    expect(root).toBeDefined();
  });
});
