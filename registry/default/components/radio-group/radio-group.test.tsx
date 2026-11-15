import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup, RadioGroupItem } from "../radio-group";

describe("RadioGroup", () => {
  it("renders options", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" data-testid="a" />
        <RadioGroupItem value="b" data-testid="b" />
      </RadioGroup>
    );
    expect(screen.getByTestId("a")).toBeTruthy();
    expect(screen.getByTestId("b")).toBeTruthy();
  });

  it("selects one option on click", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup>
        <RadioGroupItem value="a" data-testid="a" />
        <RadioGroupItem value="b" data-testid="b" />
      </RadioGroup>
    );
    await user.click(screen.getByTestId("a"));
    expect(screen.getByTestId("a")).toHaveAttribute("data-state", "checked");
  });

  it("supports arrow key navigation", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup>
        <RadioGroupItem value="a" data-testid="a" />
        <RadioGroupItem value="b" data-testid="b" />
      </RadioGroup>
    );
    const items = screen.getAllByRole("radio");
    items[0].focus();
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(items[1]);
  });
});
