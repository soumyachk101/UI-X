"use client";

import * as React from "react";
import { MultiSelect, type MultiSelectOption } from "./multi-select";

const options: MultiSelectOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "next", label: "Next.js" },
  { value: "nuxt", label: "Nuxt" },
];

export default function MultiSelectDemo() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <div className="w-full max-w-sm">
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        Select frameworks
      </label>
      <MultiSelect
        options={options}
        value={value}
        onValueChange={setValue}
        placeholder="Pick frameworks..."
      />
      {value.length > 0 && (
        <p className="mt-2 text-sm text-muted-foreground">
          Selected: {value.join(", ")}
        </p>
      )}
    </div>
  );
}
