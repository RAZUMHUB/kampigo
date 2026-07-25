import Link from "next/link";
import { Calendar, Car, PlusCircle } from "lucide-react";

import { RideCard } from "@/components/rides/RideCard";
import { Button } from "@/components/ui/button";

export default function MyRidesPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 p-8">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Rides</h1>

          <p className="mt-2 text-muted-foreground">
            Manage the rides you've booked and the rides you've offered.
          </p>
        </div>

        <Button asChild size="lg">
          <Link href="/ride-sharing/offer">
            <PlusCircle className="mr-2 h-4 w-4" />
            Offer New Ride
          </Link>
        </Button>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <h2 className="text-2xl font-semibold">Upcoming Rides</h2>
        </div>

        <RideCard
          id="ride-1"
          driverName="Rahul Patel"
          rating={4.8}
          pickup="Parul University"
          destination="Vadodara Railway Station"
          date="Today"
          time="5:30 PM"
          seatsLeft={2}
          price={120}
          vehicle="Swift Dzire"
          status="UPCOMING"
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          <h2 className="text-2xl font-semibold">Rides Offered by Me</h2>
        </div>

        <RideCard
          id="ride-2"
          driverName="You"
          rating={5.0}
          pickup="Parul University"
          destination="Vadodara Airport"
          date="Tomorrow"
          time="8:00 AM"
          seatsLeft={3}
          price={180}
          vehicle="Hyundai i20"
          status="OFFERED"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Completed Rides</h2>

        <RideCard
          id="ride-3"
          driverName="Amit Sharma"
          rating={4.9}
          pickup="Parul University"
          destination="Ahmedabad"
          date="Last Sunday"
          time="7:00 AM"
          seatsLeft={0}
          price={350}
          vehicle="Honda City"
          status="COMPLETED"
        />
      </section>
    </main>
  );
}
