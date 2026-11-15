import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";

describe("Select", () => {
  it("renders trigger", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
      </Select>
    );
    expect(screen.getByText("Pick one")).toBeTruthy();
  });

  it("shows items on click", async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>
    );
    await user.click(screen.getByText("Pick"));
    expect(screen.getByText("Option A")).toBeTruthy();
  });

  it("is accessible via keyboard", async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
          <SelectItem value="b">B</SelectItem>
        </SelectContent>
      </Select>
    );
    const trigger = screen.getByText("Pick").closest("button")!;
    trigger.focus();
    await user.keyboard("{Enter}");
    expect(screen.getByText("A")).toBeTruthy();
  });
});
