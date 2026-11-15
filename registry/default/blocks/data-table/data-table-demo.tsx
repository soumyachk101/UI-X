import { DataTable } from "./data-table";

interface Order {
  id: string;
  customer: string;
  email: string;
  status: "pending" | "shipped" | "delivered";
  amount: string;
}

const orders: Order[] = [
  { id: "#ORD-001", customer: "Olivia Martin", email: "olivia@example.com", status: "pending", amount: "$1,200.00" },
  { id: "#ORD-002", customer: "Jackson Lee", email: "jackson@example.com", status: "shipped", amount: "$950.00" },
  { id: "#ORD-003", customer: "Isabella Nguyen", email: "isabella@example.com", status: "delivered", amount: "$2,340.00" },
  { id: "#ORD-004", customer: "William Kim", email: "william@example.com", status: "pending", amount: "$480.00" },
  { id: "#ORD-005", customer: "Sofia Davis", email: "sofia@example.com", status: "shipped", amount: "$1,750.00" },
  { id: "#ORD-006", customer: "Liam Johnson", email: "liam@example.com", status: "delivered", amount: "$620.00" },
];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pending", variant: "secondary" },
  shipped: { label: "Shipped", variant: "default" },
  delivered: { label: "Delivered", variant: "outline" },
};

export function DataTableDemo() {
  return (
    <div className="p-6">
      <DataTable
        title="Recent Orders"
        description="A list of recent orders from your store."
        pageSize={5}
        columns={[
          {
            key: "id",
            header: "Order",
            sortable: true,
            render: (item: Order) => (
              <span className="font-medium">{item.id}</span>
            ),
          },
          {
            key: "customer",
            header: "Customer",
            sortable: true,
            render: (item: Order) => (
              <div>
                <p className="font-medium">{item.customer}</p>
                <p className="text-xs text-muted-foreground">{item.email}</p>
              </div>
            ),
          },
          {
            key: "status",
            header: "Status",
            sortable: true,
            render: (item: Order) => (
              <Badge variant={statusMap[item.status]?.variant ?? "secondary"}>
                {statusMap[item.status]?.label ?? item.status}
              </Badge>
            ),
          },
          {
            key: "amount",
            header: "Amount",
            sortable: true,
            render: (item: Order) => (
              <span className="font-medium">{item.amount}</span>
            ),
          },
        ]}
        data={orders}
      />
    </div>
  );
}
