import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "../switch";

describe("Switch", () => {
  it("renders unchecked by default", () => {
    render(<Switch data-testid="sw" />);
    expect(screen.getByTestId("sw")).toHaveAttribute("data-state", "unchecked");
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Switch data-testid="sw" />);
    await user.click(screen.getByTestId("sw"));
    expect(screen.getByTestId("sw")).toHaveAttribute("data-state", "checked");
  });

  it("supports keyboard toggle", async () => {
    const user = userEvent.setup();
    render(<Switch data-testid="sw" />);
    const sw = screen.getByTestId("sw");
    sw.focus();
    await user.keyboard(" ");
    expect(sw).toHaveAttribute("data-state", "checked");
  });
});
