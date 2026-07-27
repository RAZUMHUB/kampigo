import Link from "next/link";
import {
  ArrowRight,
  Car,
  MapPin,
  PlusCircle,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const actions = [
  {
    title: "Find a Ride",
    description: "Search verified student rides.",
    href: "/ride-sharing/search",
    icon: Search,
    color: "text-sky-600",
  },
  {
    title: "Offer a Ride",
    description: "Share your empty seats.",
    href: "/ride-sharing/offer",
    icon: PlusCircle,
    color: "text-emerald-600",
  },
  {
    title: "My Rides",
    description: "Bookings and ride management.",
    href: "/ride-sharing/my-rides",
    icon: MapPin,
    color: "text-orange-500",
  },
];

const stats = [
  {
    label: "Verified Students",
    value: "12K+",
    icon: ShieldCheck,
  },
  {
    label: "Active Rides",
    value: "850+",
    icon: Car,
  },
  {
    label: "Happy Travellers",
    value: "25K+",
    icon: Users,
  },
];

export function RideHero() {
  return (
    <section className="space-y-8">

      <div className="relative overflow-hidden rounded-[2rem] border bg-gradient-to-br from-sky-600 via-indigo-600 to-violet-700 p-8 text-white shadow-2xl md:p-12">

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative z-10">

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
            <ShieldCheck className="h-4 w-4" />
            Verified Campus Ride Sharing
          </div>

          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight md:text-6xl">
            Travel
            <span className="text-cyan-300"> Together.</span>
            <br />
            Save More.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-blue-100">
            Find trusted student rides, reduce travel costs,
            travel safely and make every journey easier.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Button
              size="lg"
              className="rounded-xl bg-white text-slate-900 hover:bg-slate-100"
            >
              <Link href="/ride-sharing/search">
                Find Ride
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-xl border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              <Link href="/ride-sharing/offer">
                Offer Ride
              </Link>
            </Button>

          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur"
                >
                  <Icon className="h-6 w-6" />

                  <div className="mt-4 text-3xl font-bold">
                    {item.value}
                  </div>

                  <div className="text-sm text-blue-100">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.title} href={item.href}>
              <Card className="group h-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

                <Icon className={`h-10 w-10 ${item.color}`} />

                <h2 className="mt-5 text-xl font-semibold">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>

                <ArrowRight className="mt-6 h-5 w-5 transition-transform group-hover:translate-x-1" />

              </Card>
            </Link>
          );
        })}
      </div>

    </section>
  );
}
