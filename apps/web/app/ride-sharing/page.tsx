import Image from "next/image";
import { AuthGuard } from "@/components/auth/auth-guard";

import { RideHero } from "@/components/rides/ui/RideHero";
import { RideStats } from "@/components/rides/ui/RideStats";
import { UpcomingTrips } from "@/components/rides/ui/UpcomingTrips";
import { PickupPoints } from "@/components/rides/ui/PickupPoints";
import { PopularRoutesGrid } from "@/components/rides/ui/PopularRoutesGrid";
import { FloatingOfferRide } from "@/components/rides/ui/FloatingOfferRide";
import { FadeIn } from "@/components/rides/ui/FadeIn";

const rides = [
  {
    name: "Royal Enfield Bullet",
    image: "/demo/rides/bullet.jpeg",
  },
  {
    name: "Maruti Swift",
    image: "/demo/rides/swift.jpeg",
  },
  {
    name: "Hero Splendor",
    image: "/demo/rides/splendor.jpeg",
  },
];

export default function RideSharingPage() {
  return (
    <AuthGuard>
      <main className="mx-auto max-w-7xl space-y-12 p-6 md:p-8">

        <FadeIn><RideHero /></FadeIn>

        <FadeIn delay={100}><RideStats /></FadeIn>

        <FadeIn delay={200}><UpcomingTrips /></FadeIn>

        <FadeIn delay={300}><PickupPoints /></FadeIn>

                <FadeIn delay={400}><PopularRoutesGrid /></FadeIn>

<section className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="mb-6 text-2xl font-bold">
            Featured Vehicles
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {rides.map((ride) => (
              <div
                key={ride.name}
                className="group overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30"
              >
                <Image
                  sizes="(max-width:768px) 100vw, 33vw"
                  src={ride.image}
                  alt={ride.name}
                  width={600}
                  height={400}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
                    {ride.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
        <FloatingOfferRide />
      </main>
    </AuthGuard>
  );
}
