"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  slides: React.ReactNode[];
  className?: string;
}

function Carousel({ slides, className }: CarouselProps) {
  const [current, setCurrent] = React.useState(0);
  const total = slides.length;

  const prev = () => setCurrent((s) => (s === 0 ? total - 1 : s - 1));
  const next = () => setCurrent((s) => (s === total - 1 ? 0 : s + 1));

  return (
    <div className={cn("relative w-full", className)}>
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full shrink-0">
              {slide}
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current}
                onClick={() => setCurrent(i)}
                className={cn(
                  "size-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  i === current
                    ? "bg-primary w-4"
                    : "bg-primary/40 hover:bg-primary/70"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

Carousel.displayName = "Carousel";

export { Carousel };
