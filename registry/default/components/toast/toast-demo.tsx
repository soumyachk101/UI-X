"use client";

import { Toast, ToastProvider, useToast } from "@/components/ui/toast";

function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto w-80 rounded-md border p-4 shadow-lg ${
            t.variant === "destructive"
              ? "border-destructive bg-destructive text-destructive-foreground"
              : "border-border bg-background text-foreground"
          }`}
        >
          {t.title && <div className="font-semibold">{t.title}</div>}
          {t.description && (
            <div className="text-sm opacity-90">{t.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ToastDemo() {
  return (
    <ToastProvider>
      <div className="flex flex-col gap-2">
        <ToastButton />
      </div>
      <Toaster />
    </ToastProvider>
  );
}

function ToastButton() {
  const { toast } = useToast();

  return (
    <button
      onClick={() =>
        toast({
          title: "Hello",
          description: "This is a toast notification.",
        })
      }
      className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
    >
      Show Toast
    </button>
  );
}
