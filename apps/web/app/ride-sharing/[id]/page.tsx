import {
  ArrowRight,
  Calendar,
  Car,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  Wallet,
} from "lucide-react";

import { AuthGuard } from "@/components/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function RideDetailsPage() {
  return (
    <AuthGuard>
      <main className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

          <div className="space-y-8">

            <Card className="rounded-3xl p-8">

              <div className="flex items-center gap-3 text-sm text-primary font-medium">
                <ShieldCheck className="h-5 w-5" />
                Verified Student Ride
              </div>

              <div className="mt-8 flex items-center gap-5">

                <div>
                  <p className="text-sm text-muted-foreground">
                    Pickup
                  </p>

                  <h2 className="text-2xl font-bold">
                    Parul University
                  </h2>
                </div>

                <ArrowRight className="h-7 w-7 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Destination
                  </p>

                  <h2 className="text-2xl font-bold">
                    Vadodara Railway Station
                  </h2>
                </div>

              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2">

                <Info
                  icon={<Calendar className="h-5 w-5" />}
                  title="Travel Date"
                  value="12 August 2026"
                />

                <Info
                  icon={<Clock3 className="h-5 w-5" />}
                  title="Departure"
                  value="08:30 AM"
                />

                <Info
                  icon={<Car className="h-5 w-5" />}
                  title="Vehicle"
                  value="Swift Dzire"
                />

                <Info
                  icon={<Users className="h-5 w-5" />}
                  title="Seats Left"
                  value="3"
                />

              </div>

            </Card>

            <Card className="rounded-3xl p-8">

              <h2 className="text-xl font-semibold">
                Driver
              </h2>

              <div className="mt-6 flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold">
                    P
                  </div>

                  <div>

                    <h3 className="font-semibold text-lg">
                      Prince Kumar
                    </h3>

                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      4.9 Rating
                    </div>

                  </div>

                </div>

                <ShieldCheck className="h-8 w-8 text-green-600" />

              </div>

            </Card>

          </div>

          <div>

            <Card className="sticky top-24 rounded-3xl p-8">

              <div className="text-center">

                <p className="text-sm text-muted-foreground">
                  Price Per Seat
                </p>

                <h2 className="mt-2 text-5xl font-bold">
                  ₹120
                </h2>

              </div>

              <div className="my-8 border-t" />

              <div className="space-y-4">

                <Row
                  icon={<Wallet className="h-5 w-5" />}
                  text="Cash / UPI Accepted"
                />

                <Row
                  icon={<MapPin className="h-5 w-5" />}
                  text="Exact pickup shared after booking"
                />

                <Row
                  icon={<ShieldCheck className="h-5 w-5" />}
                  text="Campus verified driver"
                />

              </div>

              <Button
                className="mt-8 w-full"
                size="lg"
              >
                Book Seat
              </Button>

              <Button
                variant="outline"
                className="mt-3 w-full"
              >
                Share Ride
              </Button>

            </Card>

          </div>

        </div>

      </main>
    </AuthGuard>
  );
}

function Info({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border p-5">
      <div className="flex items-center gap-3 text-primary">
        {icon}
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        {title}
      </p>

      <h3 className="mt-1 font-semibold">
        {value}
      </h3>
    </div>
  );
}

function Row({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-primary">
        {icon}
      </div>

      <span>{text}</span>
    </div>
  );
}
