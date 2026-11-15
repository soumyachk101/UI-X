"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

interface CalendarProps {
  selectedDate?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

function Calendar({
  selectedDate,
  onSelect,
  className,
}: CalendarProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());

  React.useEffect(() => {
    if (selectedDate) {
      setCurrentYear(selectedDate.getFullYear());
      setCurrentMonth(selectedDate.getMonth());
    }
  }, [selectedDate]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const selectDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    onSelect?.(date);
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === currentYear &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getDate() === day
    );
  };

  const isToday = (day: number) => {
    return (
      today.getFullYear() === currentYear &&
      today.getMonth() === currentMonth &&
      today.getDate() === day
    );
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className={cn("w-72 rounded-lg border p-3", className)}>
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={prevMonth}
          className="rounded p-1 hover:bg-accent"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-sm font-medium">
          {MONTHS[currentMonth]} {currentYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="rounded p-1 hover:bg-accent"
          aria-label="Next month"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs text-muted-foreground mb-1">
        {DAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center text-sm">
        {cells.map((day, idx) => (
          <button
            key={idx}
            type="button"
            disabled={day === null}
            onClick={() => day !== null && selectDate(day)}
            aria-label={
              day
                ? `${MONTHS[currentMonth]} ${day}, ${currentYear}`
                : undefined
            }
            aria-pressed={day ? isSelected(day) : undefined}
            className={cn(
              "size-8 rounded-md flex items-center justify-center mx-auto",
              day === null && "pointer-events-none",
              day && "hover:bg-accent",
              isSelected(day) &&
                "bg-primary text-primary-foreground hover:bg-primary",
              isToday(day) && !isSelected(day) && "font-bold ring-1 ring-primary"
            )}
          >
            {day ?? ""}
          </button>
        ))}
      </div>
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
