import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultiSelect, type MultiSelectOption } from "../multi-select";

const options: MultiSelectOption[] = [
  { value: "x", label: "X-Ray" },
  { value: "y", label: "Yoyo" },
  { value: "z", label: "Zebra" },
];

describe("MultiSelect", () => {
  it("renders placeholder when nothing selected", () => {
    render(<MultiSelect options={options} />);
    expect(screen.getByText("Select items...")).toBeTruthy();
  });

  it("shows selected items as chips", () => {
    render(<MultiSelect options={options} value={["x"]} onValueChange={() => {}} />);
    expect(screen.getByText("X-Ray")).toBeTruthy();
  });

  it("allows removing a chip", async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} value={["x"]} onValueChange={() => {}} />);
    const removeBtn = screen.getByLabelText("Remove X-Ray");
    await user.click(removeBtn);
    expect(screen.queryByText("X-Ray")).toBeNull();
    expect(screen.getByText("Select items...")).toBeTruthy();
  });

  it("opens popover with unfiltered options", async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} value={[]} onValueChange={() => {}} />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByText("X-Ray")).toBeTruthy();
    expect(screen.getByText("Yoyo")).toBeTruthy();
    expect(screen.getByText("Zebra")).toBeTruthy();
  });
});
