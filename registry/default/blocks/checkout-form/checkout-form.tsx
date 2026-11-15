"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CheckoutFormProps {
  className?: string;
}

const defaultOrderSummary = {
  subtotal: 189.99,
  shipping: 9.99,
  tax: 15.2,
  total: 215.18,
};

export function CheckoutForm({ className }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Checkout:", formData);
  };

  const { subtotal, shipping, tax, total } = defaultOrderSummary;

  return (
    <div className={cn("w-full", className)}>
      <div className="grid gap-8 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Shipping Information</h2>
            <p className="text-sm text-muted-foreground">Enter your shipping address.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
            </div>
          </div>
          <Button type="submit" className="w-full sm:w-auto">Place Order</Button>
        </form>
        <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
      </div>
    </div>
  );
}

function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
}: {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm h-fit">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      <div className="mt-4 space-y-3 text-sm">
        <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
        <Row label="Shipping" value={`$${shipping.toFixed(2)}`} />
        <Row label="Tax" value={`$${tax.toFixed(2)}`} />
        <div className="border-t pt-3 flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <Button className="w-full mt-6">Place Order</Button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
