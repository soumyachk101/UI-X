"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm({
  className,
}: {
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Forgot password:", { email });
  };

  if (submitted) {
    return (
      <div className={cn("w-full max-w-sm", className)}>
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="text-sm text-muted-foreground">
            We sent a password reset link to <span className="font-medium">{email}</span>
          </p>
          <Button variant="link" className="self-center">
            <a href="#">Back to login</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-sm", className)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Forgot password?</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below and we&apos;ll send you a reset link.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </div>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground">
            Back to login
          </a>
        </p>
      </div>
    </div>
  );
}
