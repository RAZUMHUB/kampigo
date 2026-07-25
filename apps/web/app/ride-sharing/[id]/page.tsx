import {
  BadgeCheck,
  Calendar,
  Car,
  Clock3,
  MapPin,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function RideDetailsPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 p-8">

      <section>
        <h1 className="text-3xl font-bold">Ride Details</h1>

        <p className="mt-2 text-muted-foreground">
          View complete ride information before requesting to join.
        </p>
      </section>

      <Card className="p-6">

        <div className="flex items-start justify-between">

          <div className="flex gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold">
              R
            </div>

            <div>

              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  Rahul Patel
                </h2>

                <BadgeCheck className="h-5 w-5 text-blue-600" />
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                4.8 • Verified Student
              </div>

            </div>

          </div>

          <div className="rounded-full bg-primary/10 px-4 py-2 font-semibold">
            ₹120 / Seat
          </div>

        </div>

      </Card>

      <Card className="space-y-5 p-6">

        <h2 className="text-xl font-semibold">
          Trip Information
        </h2>

        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-green-600" />
          <span>Parul University</span>
        </div>

        <div className="ml-8 text-muted-foreground">
          ↓
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-red-600" />
          <span>Vadodara Railway Station</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today
          </div>

          <div className="flex items-center gap-2">
            <Clock3 className="h-5 w-5" />
            5:30 PM
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            2 Seats Available
          </div>

          <div className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Swift Dzire
          </div>

        </div>

      </Card>

      <Card className="space-y-4 p-6">

        <h2 className="text-xl font-semibold">
          Driver Notes
        </h2>

        <p className="text-muted-foreground">
          Pickup from the Main Gate. Please arrive 10 minutes early.
          Small luggage is allowed.
        </p>

      </Card>

      <Card className="space-y-4 p-6">

        <h2 className="text-xl font-semibold">
          Ride Preferences
        </h2>

        <div className="grid gap-3 md:grid-cols-2">

          <div>
            <strong>Vehicle</strong>
            <p className="text-muted-foreground">
              Swift Dzire
            </p>
          </div>

          <div>
            <strong>Gender Preference</strong>
            <p className="text-muted-foreground">
              Any Student
            </p>
          </div>

          <div>
            <strong>Payment</strong>
            <p className="text-muted-foreground">
              Cash / UPI
            </p>
          </div>

          <div>
            <strong>Luggage</strong>
            <p className="text-muted-foreground">
              Small Bags Allowed
            </p>
          </div>

        </div>

      </Card>

      <Button className="w-full" size="lg">
        Request to Join Ride
      </Button>

    </main>
  );
}
