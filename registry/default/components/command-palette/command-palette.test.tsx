import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommandPalette, type CommandPaletteItem } from "../command-palette";

const items: CommandPaletteItem[] = [
  { id: "1", label: "Go to Dashboard", group: "Navigation" },
  { id: "2", label: "Open Settings", group: "Navigation" },
  { id: "3", label: "New Project", group: "Actions" },
];

describe("CommandPalette", () => {
  it("renders open when controlled true", () => {
    render(<CommandPalette items={items} open={true} onOpenChange={() => {}} />);
    expect(screen.getByPlaceholderText("Search...")).toBeTruthy();
  });

  it("filters items on type", async () => {
    const user = userEvent.setup();
    render(<CommandPalette items={items} open={true} onOpenChange={() => {}} />);
    const input = screen.getByPlaceholderText("Search...");
    await user.type(input, "Dash");
    expect(screen.getByText("Go to Dashboard")).toBeTruthy();
    expect(screen.queryByText("New Project")).toBeNull();
  });

  it("calls onSelect and closes", async () => {
    const user = userEvent.setup();
    let closed = false;
    const item: CommandPaletteItem = {
      id: "1",
      label: "Test Action",
      onSelect: () => { closed = true; },
    };
    render(<CommandPalette items={[item]} open={true} onOpenChange={() => {}} />);
    await user.click(screen.getByText("Test Action"));
    expect(closed).toBe(true);
  });

  it("shows no results when query matches nothing", async () => {
    const user = userEvent.setup();
    render(<CommandPalette items={items} open={true} onOpenChange={() => {}} />);
    const input = screen.getByPlaceholderText("Search...");
    await user.type(input, "zzz");
    expect(screen.getByText("No results found.")).toBeTruthy();
  });
});
