import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Combobox, type ComboboxOption } from "../combobox";

const options: ComboboxOption[] = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
  { value: "c", label: "Gamma" },
];

describe("Combobox", () => {
  it("renders placeholder text", () => {
    render(<Combobox options={options} />);
    expect(screen.getByText("Select an option...")).toBeTruthy();
  });

  it("opens popover and filters options", async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} placeholder="Select..." />);
    await user.click(screen.getByRole("combobox"));
    const input = screen.getByPlaceholderText("Select...");
    await user.type(input, "Be");
    expect(screen.getByText("Beta")).toBeTruthy();
  });

  it("selects an option on click", async () => {
    const user = userEvent.setup();
    const onChange = () => {};
    render(
      <Combobox options={options} onValueChange={onChange} placeholder="Select..." />
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Alpha"));
    expect(screen.getByRole("combobox")).toHaveTextContent("Alpha");
  });
});
