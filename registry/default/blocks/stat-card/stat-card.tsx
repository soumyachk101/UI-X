import { Badge } from "@/components/ui/badge";

interface StatCardProps {
  label: string;
  value: string;
  trend?: { value: string; direction: "up" | "down" };
  icon?: React.ReactNode;
}

export function StatCard({ label, value, trend, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {trend && (
        <div className="mt-2 flex items-center gap-2">
          <Badge variant={trend.direction === "up" ? "default" : "destructive"}>
            {trend.direction === "up" ? "↑" : "↓"} {trend.value}
          </Badge>
          <span className="text-xs text-muted-foreground">
            from last month
          </span>
        </div>
      )}
    </div>
  );
}
