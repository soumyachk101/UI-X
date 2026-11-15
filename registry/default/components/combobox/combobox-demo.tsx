"use client";

import * as React from "react";
import { Combobox, type ComboboxOption } from "./combobox";

const options: ComboboxOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
  { value: "grape", label: "Grape" },
];

export default function ComboboxDemo() {
  const [value, setValue] = React.useState<string>("");

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        Select a fruit
      </label>
      <Combobox
        options={options}
        value={value}
        onValueChange={setValue}
        placeholder="Search fruits..."
      />
      {value && (
        <p className="mt-2 text-sm text-muted-foreground">
          Selected: {options.find((o) => o.value === value)?.label}
        </p>
      )}
    </div>
  );
}
