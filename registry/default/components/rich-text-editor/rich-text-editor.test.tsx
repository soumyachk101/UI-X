import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RichTextEditor } from "../rich-text-editor";

describe("RichTextEditor", () => {
  it("renders toolbar buttons", () => {
    render(<RichTextEditor />);
    expect(screen.getByLabelText("Bold")).toBeTruthy();
    expect(screen.getByLabelText("Italic")).toBeTruthy();
    expect(screen.getByLabelText("Underline")).toBeTruthy();
  });

  it("wraps selection in bold on click", async () => {
    const user = userEvent.setup();
    render(<RichTextEditor />);
    const editor = screen.getByRole("textbox");
    editor.focus();
    await user.type(editor, "hello world");
    editor.select();
    await user.click(screen.getByLabelText("Bold"));
    expect(editor.innerHTML).toContain("<b>");
  });

  it("calls onChange with updated HTML", async () => {
    const user = userEvent.setup();
    let latest = "";
    render(
      <RichTextEditor onChange={(html) => { latest = html; }} />
    );
    const editor = screen.getByRole("textbox");
    editor.focus();
    await user.type(editor, "text");
    expect(latest).toContain("text");
  });
});
