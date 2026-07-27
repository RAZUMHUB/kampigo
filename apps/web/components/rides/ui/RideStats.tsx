import { Car, Users, ShieldCheck, Route } from "lucide-react";

const stats = [
  {
    title: "Active Rides",
    value: "128+",
    icon: Car,
    color: "text-blue-600",
  },
  {
    title: "Verified Students",
    value: "2.4K+",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Safe Trips",
    value: "98%",
    icon: ShieldCheck,
    color: "text-emerald-600",
  },
  {
    title: "Popular Routes",
    value: "35+",
    icon: Route,
    color: "text-orange-600",
  },
];

export function RideStats() {
  return (
    <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Icon className={`h-8 w-8 ${item.color}`} />

            <h3 className="mt-5 text-3xl font-bold">
              {item.value}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {item.title}
            </p>
          </div>
        );
      })}
    </section>
  );
}
