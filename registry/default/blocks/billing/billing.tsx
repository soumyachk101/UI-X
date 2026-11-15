import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
}

interface BillingProps {
  plan?: string;
  price?: string;
  invoices?: Invoice[];
}

const statusBadgeVariant: Record<string, "default" | "secondary" | "destructive"> = {
  paid: "default",
  pending: "secondary",
  failed: "destructive",
};

const defaultInvoices: Invoice[] = [
  { id: "INV-001", date: "2025-11-01", amount: "$29.00", status: "paid" },
  { id: "INV-002", date: "2025-10-01", amount: "$29.00", status: "paid" },
  { id: "INV-003", date: "2025-09-01", amount: "$29.00", status: "paid" },
  { id: "INV-004", date: "2025-08-01", amount: "$29.00", status: "pending" },
];

export function Billing({
  plan = "Pro",
  price = "$29.00 / month",
  invoices = defaultInvoices,
}: BillingProps) {
  return (
    <div className="w-full max-w-4xl space-y-8">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Current Plan</h2>
            <p className="text-sm text-muted-foreground">You are currently on the <span className="font-medium text-foreground">{plan}</span> plan at <span className="font-medium text-foreground">{price}</span>.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Change Plan</Button>
            <Button variant="destructive">Cancel Plan</Button>
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Payment Method</h3>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-10 w-14 items-center justify-center rounded-md bg-muted text-xs font-bold">
            VISA
          </div>
          <div>
            <p className="text-sm font-medium">Visa ending in 4242</p>
            <p className="text-xs text-muted-foreground">Expires 12/2027</p>
          </div>
        </div>
        <Button variant="link" className="mt-4 px-0">Update payment method</Button>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Invoice History</h3>
        <div className="mt-4 rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Invoice</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{invoice.id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{invoice.date}</td>
                    <td className="px-4 py-3">{invoice.amount}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusBadgeVariant[invoice.status]}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {invoices.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">No invoices yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
