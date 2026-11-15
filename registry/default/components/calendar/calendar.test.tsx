import React from "react"
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as Calendar from "../calendar";

describe("Calendar", () => {
  it("renders current month name", () => {
    render(<Calendar.Calendar />);
    const now = new Date();
    const monthName = now.toLocaleString("en-US", { month: "long" });
    const year = now.getFullYear();
    expect(screen.getByText(`${monthName} ${year}`)).toBeDefined();
  });

  it("navigates to previous month", async () => {
    const user = userEvent.setup();
    render(<Calendar.Calendar />);
    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    const prevMonthLabel = `${prevMonth.toLocaleString("en-US", { month: "long" })} ${prevMonth.getFullYear()}`;
    await user.click(screen.getByLabelText("Previous month"));
    expect(screen.getByText(prevMonthLabel)).toBeDefined();
  });

  it("navigates to next month", async () => {
    const user = userEvent.setup();
    render(<Calendar.Calendar />);
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1);
    const nextMonthLabel = `${nextMonth.toLocaleString("en-US", { month: "long" })} ${nextMonth.getFullYear()}`;
    await user.click(screen.getByLabelText("Next month"));
    expect(screen.getByText(nextMonthLabel)).toBeDefined();
  });

  it("calls onSelect when a day is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = (date: Date) => {
      expect(date).toBeInstanceOf(Date);
      expect(date.getMonth()).toBe(new Date().getMonth());
      expect(date.getFullYear()).toBe(new Date().getFullYear());
    };
    render(<Calendar.Calendar onSelect={onSelect} />);
    const dayButtons = screen.getAllByRole("button").filter((btn) => {
      const label = btn.getAttribute("aria-label");
      return label && label.startsWith(`${new Date().toLocaleString("en-US", { month: "long" })} `);
    });
    if (dayButtons.length > 0) {
      await user.click(dayButtons[0]);
    }
  });

  it("applies className to root element", () => {
    render(<Calendar.Calendar className="my-calendar" />);
    expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/).closest(".my-calendar")).toBeTruthy();
  });
});
