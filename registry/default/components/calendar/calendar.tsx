"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  selectedDate?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function Calendar({ selectedDate, onSelect, className }: CalendarProps) {
  const [viewMonth, setViewMonth] = React.useState(() => {
    return selectedDate ? selectedDate.getMonth() : new Date().getMonth();
  });
  const [viewYear, setViewYear] = React.useState(() => {
    return selectedDate ? selectedDate.getFullYear() : new Date().getFullYear();
  });
  const today = React.useMemo(() => new Date(), []);

  React.useEffect(() => {
    if (selectedDate) {
      setViewMonth(selectedDate.getMonth());
      setViewYear(selectedDate.getFullYear());
    }
  }, [selectedDate]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDayClick = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    onSelect?.(date);
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, () => null);

  return (
    <div
      className={cn("p-3 select-none", className)}
      role="grid"
      aria-label={`Calendar for ${MONTHS[viewMonth]} ${viewYear}`}
    >
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={prevMonth}
          aria-label={`Previous month: ${MONTHS[viewMonth === 0 ? 11 : viewMonth - 1]}`}
          className="rounded p-1 hover:bg-accent"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <span className="text-sm font-medium">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          aria-label={`Next month: ${MONTHS[viewMonth === 11 ? 0 : viewMonth + 1]}`}
          className="rounded p-1 hover:bg-accent"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px text-center text-xs text-muted-foreground mb-1">
        {DAYS.map((day) => (
          <div key={day} className="py-1 font-medium" role="columnheader">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px" role="rowgroup">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} role="gridcell" />
        ))}
        {days.map((day) => {
          const isToday = isSameDay(
            new Date(viewYear, viewMonth, day),
            today
          );
          const isSelected =
            selectedDate &&
            isSameDay(selectedDate, new Date(viewYear, viewMonth, day));
          return (
            <button
              key={day}
              type="button"
              role="gridcell"
              aria-selected={isSelected}
              aria-label={`${MONTHS[viewMonth]} ${day}, ${viewYear}${isSelected ? ", selected" : ""}${isToday ? ", today" : ""}`}
              onClick={() => handleDayClick(day)}
              className={cn(
                "size-8 text-sm flex items-center justify-center rounded",
                "hover:bg-accent",
                isSelected && "bg-primary text-primary-foreground",
                isToday && !isSelected && "font-bold"
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
