import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "../checkbox";

describe("Checkbox", () => {
  it("renders unchecked by default", () => {
    render(<Checkbox data-testid="cb" />);
    expect(screen.getByTestId("cb")).toHaveAttribute("data-state", "unchecked");
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Checkbox data-testid="cb" />);
    await user.click(screen.getByTestId("cb"));
    expect(screen.getByTestId("cb")).toHaveAttribute("data-state", "checked");
  });

  it("respects checked prop", () => {
    render(<Checkbox checked data-testid="cb" />);
    expect(screen.getByTestId("cb")).toHaveAttribute("data-state", "checked");
  });

  it("is keyboard accessible", () => {
    render(<Checkbox data-testid="cb" />);
    const cb = screen.getByTestId("cb");
    cb.focus();
    expect(document.activeElement).toBe(cb);
  });
});
