import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FileUpload } from "../file-upload";

describe("FileUpload", () => {
  it("renders drop zone text", () => {
    render(<FileUpload />);
    expect(screen.getByText("Drag and drop or click to browse")).toBeTruthy();
  });

  it("accepts dropped files", async () => {
    const user = userEvent.setup();
    const onUpload = () => {};
    render(<FileUpload onUpload={onUpload} multiple />);
    const dropZone = screen.getByRole("button");
    const file = new File(["hello"], "test.txt", { type: "text/plain" });
    const dt = new DataTransfer();
    dt.items.add(file);
    await user.upload(dropZone, dt.files);
    expect(screen.getByText("test.txt")).toBeTruthy();
  });

  it("removes a file from the list", async () => {
    const user = userEvent.setup();
    const onUpload = () => {};
    render(<FileUpload onUpload={onUpload} />);
    const dropZone = screen.getByRole("button");
    const file = new File(["hello"], "test.txt", { type: "text/plain" });
    const dt = new DataTransfer();
    dt.items.add(file);
    await user.upload(dropZone, dt.files);
    const removeBtn = screen.getByLabelText("Remove test.txt");
    await user.click(removeBtn);
    expect(screen.queryByText("test.txt")).toBeNull();
    expect(screen.getByText("Drag and drop or click to browse")).toBeTruthy();
  });
});
