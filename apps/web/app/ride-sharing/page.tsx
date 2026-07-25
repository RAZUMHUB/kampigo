import Image from "next/image";
import Link from "next/link";
import { Car, Search, PlusCircle, MapPin, ArrowRight } from "lucide-react";



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
    <main className="mx-auto max-w-7xl p-8">
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
        <div className="flex items-center gap-3">
          <Car className="h-10 w-10" />
          <div>
            <h1 className="text-4xl font-bold">Ride Sharing</h1>
            <p className="mt-2 text-blue-100">
              Travel safely with verified students from your campus.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Link
          href="/ride-sharing/search"
          className="rounded-2xl border p-6 transition hover:shadow-lg"
        >
          <Search className="h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-xl font-semibold">Find a Ride</h2>
          <p className="mt-2 text-gray-500">
            Search available rides posted by students.
          </p>
          <ArrowRight className="mt-6 h-5 w-5" />
        </Link>

        <Link
          href="/ride-sharing/offer"
          className="rounded-2xl border p-6 transition hover:shadow-lg"
        >
          <PlusCircle className="h-10 w-10 text-green-600" />
          <h2 className="mt-4 text-xl font-semibold">Offer a Ride</h2>
          <p className="mt-2 text-gray-500">
            Publish your journey and share empty seats.
          </p>
          <ArrowRight className="mt-6 h-5 w-5" />
        </Link>

        <Link
          href="/ride-sharing/my-rides"
          className="rounded-2xl border p-6 transition hover:shadow-lg"
        >
          <MapPin className="h-10 w-10 text-orange-600" />
          <h2 className="mt-4 text-xl font-semibold">My Rides</h2>
          <p className="mt-2 text-gray-500">
            Manage your booked and offered rides.
          </p>
          <ArrowRight className="mt-6 h-5 w-5" />
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Popular Routes</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border p-5">
            🚗 Parul University → Vadodara Railway Station
          </div>

          <div className="rounded-xl border p-5">
            ✈️ Parul University → Vadodara Airport
          </div>

          <div className="rounded-xl border p-5">
            🏙️ Parul University → Ahmedabad
          </div>

          <div className="rounded-xl border p-5">
            🚌 Parul University → Anand
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">
          Featured Vehicles
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {rides.map((ride) => (
            <div
              key={ride.name}
              className="overflow-hidden rounded-2xl border"
            >
              <Image
                src={ride.image}
                alt={ride.name}
                width={600}
                height={400}
                className="h-56 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {ride.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}