import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";

const routes = [
  {
    from: "Parul University",
    to: "Vadodara Railway Station",
    rides: 18,
  },
  {
    from: "Parul University",
    to: "Vadodara Airport",
    rides: 12,
  },
  {
    from: "Parul University",
    to: "Anand",
    rides: 9,
  },
  {
    from: "Parul University",
    to: "Ahmedabad",
    rides: 7,
  },
];

export function PopularRoutesGrid() {
  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Popular Routes
          </h2>

          <p className="text-sm text-muted-foreground">
            Frequently travelled routes by students.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {routes.map((route) => (
          <Card
            key={route.to}
            className="rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">
                    {route.from}
                  </span>
                </div>

                <div className="ml-7 my-2 text-muted-foreground">
                  ↓
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span className="font-semibold">
                    {route.to}
                  </span>
                </div>

                <p className="mt-4 text-sm text-muted-foreground">
                  {route.rides} active rides available
                </p>
              </div>

              <Link
                href="/ride-sharing/search"
                className="rounded-full border p-3 transition hover:bg-muted"
              >
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
