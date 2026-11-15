"use client";

import { useCallback } from "react";
import { Toast, ToastProvider, useToast } from "@/components/ui/toast";

function useToastFn() {
  const { toast } = useToast();

  const showToast = useCallback(
    (props: { title?: string; description?: string; variant?: "default" | "destructive" }) => {
      toast(props);
    },
    [toast]
  );

  return { toast: showToast };
}

export { useToast };
