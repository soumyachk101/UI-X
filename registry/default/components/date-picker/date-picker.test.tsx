import React from "react"
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DatePicker } from "../date-picker";

describe("DatePicker", () => {
  it("renders with placeholder text", () => {
    render(<DatePicker placeholder="Select a date" />);
    expect(screen.getByPlaceholderText("Select a date")).toBeDefined();
  });

  it("displays formatted selected date", () => {
    const date = new Date(2024, 5, 15);
    render(<DatePicker selectedDate={date} />);
    expect(screen.getByDisplayValue("June 15, 2024")).toBeDefined();
  });

  it("has correct aria attributes on input", () => {
    render(<DatePicker />);
    const input = screen.getByRole("textbox");
    expect(input.getAttribute("aria-haspopup")).toBe("dialog");
    expect(input.getAttribute("aria-expanded")).toBe("false");
  });

  it("opens calendar popover when icon button is clicked", () => {
    render(<DatePicker />);
    fireEvent.click(screen.getByLabelText("Open date picker"));
    expect(screen.getByLabelText("Previous month")).toBeDefined();
  });

  it("calls onSelect when a date is chosen", () => {
    const onSelect = vi.fn();
    render(<DatePicker onSelect={onSelect} />);
    fireEvent.click(screen.getByLabelText("Open date picker"));
    const today = new Date();
    const dayLabel = `${today.toLocaleString("default", { month: "long" })} ${today.getDate()}, ${today.getFullYear()}`;
    fireEvent.click(screen.getByLabelText(dayLabel));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0] instanceof Date).toBe(true);
  });

  it("shows custom placeholder", () => {
    render(<DatePicker placeholder="Choose a day" />);
    expect(screen.getByPlaceholderText("Choose a day")).toBeDefined();
  });

  it("updates input value after selecting a date", () => {
    render(<DatePicker />);
    fireEvent.click(screen.getByLabelText("Open date picker"));
    const today = new Date();
    const dayLabel = `${today.toLocaleString("default", { month: "long" })} ${today.getDate()}, ${today.getFullYear()}`;
    fireEvent.click(screen.getByLabelText(dayLabel));
    const expected = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    expect(screen.getByDisplayValue(expected)).toBeDefined();
  });
});
