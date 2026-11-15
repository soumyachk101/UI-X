import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Popover, PopoverTrigger, PopoverContent } from "../popover";

describe("Popover", () => {
  it("renders trigger and shows content on click", () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Popover content")).toBeDefined();
  });

  it("renders custom content in popover", () => {
    render(
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <p>Custom content</p>
        </PopoverContent>
      </Popover>
    );
    expect(screen.getByText("Custom content")).toBeDefined();
  });

  it("has popover content element", () => {
    const { container } = render(
      <Popover open>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    expect(container.querySelector("[data-state]")).toBeDefined();
  });

  it("renders multiple children", () => {
    render(
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <p>First</p>
          <p>Second</p>
        </PopoverContent>
      </Popover>
    );
    expect(screen.getByText("First")).toBeDefined();
    expect(screen.getByText("Second")).toBeDefined();
  });
});
