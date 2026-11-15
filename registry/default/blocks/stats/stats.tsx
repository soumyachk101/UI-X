import { Badge } from "@/components/ui/badge";

interface Stat {
  value: string;
  label: string;
  trend?: { value: string; direction: "up" | "down" };
}

interface StatsProps {
  stats?: Stat[];
  title?: string;
}

const defaultStats: Stat[] = [
  { value: "2,847", label: "Active Users", trend: { value: "+12.5%", direction: "up" } },
  { value: "$48,392", label: "Revenue", trend: { value: "+8.2%", direction: "up" } },
  { value: "1,284", label: "Conversions", trend: { value: "-2.1%", direction: "down" } },
  { value: "98.2%", label: "Uptime", trend: { value: "+0.3%", direction: "up" } },
];

export function Stats({ stats = defaultStats, title }: StatsProps) {
  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-6xl">
        {title && (
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        )}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              {stat.trend && (
                <div className="mt-2 flex items-center gap-1">
                  <Badge
                    variant={stat.trend.direction === "up" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {stat.trend.value}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
