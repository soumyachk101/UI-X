"use client";

import * as React from "react";
import { Calendar } from "./calendar";

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar selectedDate={date} onSelect={setDate} />
      <p className="text-sm text-muted-foreground">
        Selected: {date ? date.toLocaleDateString() : "None"}
      </p>
    </div>
  );
}
