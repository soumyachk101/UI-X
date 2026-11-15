import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (ClassValue | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}
