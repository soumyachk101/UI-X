"use client";

import { useState } from "react";
import { DatePicker } from "./date-picker";

export default function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col items-center gap-3">
      <DatePicker
        selectedDate={date}
        onSelect={setDate}
        placeholder="Select a date"
      />
      <p className="text-sm text-muted-foreground">
        Selected: {date ? date.toLocaleDateString() : "None"}
      </p>
    </div>
  );
}
