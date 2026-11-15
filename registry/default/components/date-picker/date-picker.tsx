"use client";

import * as React from "react";
import { Calendar } from "../calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

interface DatePickerProps {
  selectedDate?: Date;
  onSelect?: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

function DatePicker({
  selectedDate,
  onSelect,
  placeholder = "Pick a date",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (selectedDate) {
      setInputValue(selectedDate.toLocaleDateString());
    }
  }, [selectedDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <div className={cn("relative", className)}>
        <input
          type="text"
          value={inputValue}
          readOnly
          aria-haspopup="dialog"
          aria-expanded={open}
          placeholder={placeholder}
          onChange={() => {}}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close date picker" : "Open date picker"}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-accent"
        >
          <CalendarIcon className="size-4 text-muted-foreground" aria-hidden="true" />
        </button>
      </div>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={4}
          align="start"
          className="z-50 rounded-md border bg-popover p-0 shadow-md"
        >
          <Calendar
            selectedDate={selectedDate}
            onSelect={(date) => {
              onSelect?.(date);
              setInputValue(formatDate(date));
              setOpen(false);
            }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

DatePicker.displayName = "DatePicker";

export { DatePicker };
