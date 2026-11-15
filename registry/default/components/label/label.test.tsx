import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Label } from "../label";

describe("Label", () => {
  it("renders text", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email").tagName).toBe("LABEL");
  });

  it("associates with input via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email-input">Email</Label>
        <input id="email-input" />
      </>
    );
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("for", "email-input");
  });

  it("applies peer-disabled styles", () => {
    render(
      <>
        <Label data-testid="label">Disabled field</Label>
        <input disabled />
      </>
    );
    // The peer-disabled class is present on the label
    const label = screen.getByTestId("label");
    expect(label.className).toContain("peer-disabled");
  });
});
