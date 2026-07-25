import { PopularRoutes } from "@/components/rides/PopularRoutes";
import { RideCard } from "@/components/rides/RideCard";
import { RideSearchForm } from "@/components/rides/RideSearchForm";

export default function SearchRidePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 p-8">
      <RideSearchForm />

      <PopularRoutes />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Available Rides</h2>

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
        />

        <RideCard
          id="ride-2"
          driverName="Priya Shah"
          rating={4.9}
          pickup="Parul University"
          destination="Vadodara Airport"
          date="Tomorrow"
          time="8:00 AM"
          seatsLeft={3}
          price={180}
          vehicle="Hyundai i20"
        />

        <RideCard
          id="ride-3"
          driverName="Aman Verma"
          rating={4.7}
          pickup="Parul University"
          destination="Ahmedabad"
          date="Sunday"
          time="6:30 AM"
          seatsLeft={1}
          price={350}
          vehicle="Honda City"
        />
      </section>
    </main>
  );
}
