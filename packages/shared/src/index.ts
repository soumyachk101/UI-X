export function cn(...inputs: (string | boolean | undefined | null | 0)[]) {
  return inputs.filter(Boolean).join(" ");
}
