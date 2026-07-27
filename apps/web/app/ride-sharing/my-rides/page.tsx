import {
  Calendar,
  Car,
  CheckCircle2,
  Clock3,
  MapPin,
  Wallet,
  XCircle,
} from "lucide-react";

import { AuthGuard } from "@/components/auth/auth-guard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const rides = [
  {
    id: 1,
    from: "Parul University",
    to: "Vadodara Railway Station",
    date: "12 Aug 2026",
    time: "08:30 AM",
    price: 120,
    status: "Upcoming",
  },
  {
    id: 2,
    from: "Parul University",
    to: "Ahmedabad",
    date: "18 Jul 2026",
    time: "06:00 PM",
    price: 450,
    status: "Completed",
  },
];

export default function MyRidesPage() {
  return (
    <AuthGuard>
      <main className="mx-auto max-w-7xl px-6 py-10">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              My Rides
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage all your published and booked rides.
            </p>
          </div>

          <Button>
            Offer New Ride
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">

          <StatCard
            icon={<Car className="h-6 w-6" />}
            title="Total Trips"
            value="28"
          />

          <StatCard
            icon={<Calendar className="h-6 w-6" />}
            title="Upcoming"
            value="4"
          />

          <StatCard
            icon={<Wallet className="h-6 w-6" />}
            title="Earned"
            value="₹5,460"
          />

          <StatCard
            icon={<CheckCircle2 className="h-6 w-6" />}
            title="Completed"
            value="24"
          />

        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button>Upcoming</Button>
          <Button variant="outline">Completed</Button>
          <Button variant="outline">Cancelled</Button>
        </div>

        <div className="mt-8 space-y-6">

          {rides.map((ride) => (
            <Card
              key={ride.id}
              className="rounded-3xl p-6"
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <div className="flex items-center gap-4">

                    <MapPin className="h-5 w-5 text-primary" />

                    <div>

                      <h2 className="text-xl font-semibold">
                        {ride.from}
                      </h2>

                      <p className="text-muted-foreground">
                        ↓
                      </p>

                      <h2 className="text-xl font-semibold">
                        {ride.to}
                      </h2>

                    </div>

                  </div>

                </div>

                <div className="flex flex-wrap gap-6">

                  <Info
                    icon={<Calendar className="h-5 w-5" />}
                    value={ride.date}
                  />

                  <Info
                    icon={<Clock3 className="h-5 w-5" />}
                    value={ride.time}
                  />

                  <Info
                    icon={<Wallet className="h-5 w-5" />}
                    value={`₹${ride.price}`}
                  />

                </div>

                <div className="flex gap-3">

                  <Button variant="outline">
                    Edit
                  </Button>

                  <Button>
                    View
                  </Button>

                </div>

              </div>

            </Card>
          ))}

        </div>

      </main>
    </AuthGuard>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <Card className="rounded-3xl p-6">
      <div className="text-primary">
        {icon}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {title}
      </p>

      <h2 className="mt-1 text-3xl font-bold">
        {value}
      </h2>
    </Card>
  );
}

function Info({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{value}</span>
    </div>
  );
}
