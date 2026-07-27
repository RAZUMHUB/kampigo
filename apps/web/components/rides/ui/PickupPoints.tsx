import { MapPin, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";

const points = [
  {
    name: "Parul University Main Gate",
    distance: "0.2 km",
  },
  {
    name: "Boys Hostel Gate",
    distance: "0.5 km",
  },
  {
    name: "Girls Hostel Gate",
    distance: "0.6 km",
  },
  {
    name: "Vadodara Railway Station",
    distance: "18 km",
  },
];

export function PickupPoints() {
  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Popular Pickup Points
        </h2>

        <p className="text-sm text-muted-foreground">
          Frequently used pickup locations by students.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {points.map((point) => (
          <Card
            key={point.name}
            className="rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>

            <h3 className="mt-4 font-semibold">
              {point.name}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Navigation className="h-4 w-4" />
              {point.distance}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
