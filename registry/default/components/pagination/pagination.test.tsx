import React from "react"
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../pagination";

describe("Pagination", () => {
  it("renders prev/next buttons", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText("Previous page")).toBeDefined();
    expect(screen.getByLabelText("Next page")).toBeDefined();
  });

  it("renders page numbers", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: /page 1/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /page 3/i })).toBeDefined();
  });

  it("prev button is disabled on first page", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText("Previous page").hasAttribute("disabled")).toBe(true);
  });

  it("next button is disabled on last page", () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText("Next page").hasAttribute("disabled")).toBe(true);
  });

  it("calls onPageChange when a page button is clicked", () => {
    const onChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /page 3/i }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("highlights the current page", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={vi.fn()} />);
    const page3 = screen.getByRole("button", { name: /page 3/i });
    expect(page3.getAttribute("aria-current")).toBe("page");
  });

  it("navigates to next page", () => {
    const onChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onChange} />);
    fireEvent.click(screen.getByLabelText("Next page"));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("navigates to previous page", () => {
    const onChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onChange} />);
    fireEvent.click(screen.getByLabelText("Previous page"));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("has nav element with aria-label", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText("Pagination").tagName).toBe("NAV");
  });
});
