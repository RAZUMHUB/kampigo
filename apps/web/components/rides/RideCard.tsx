import Link from "next/link";
import {
  ArrowRight,
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

type RideStatus =
  | "UPCOMING"
  | "OFFERED"
  | "COMPLETED"
  | "CANCELLED";

type RideCardProps = {
  id?: string;
  driverName: string;
  rating: number;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  seatsLeft: number;
  price: number;
  vehicle: string;
  verified?: boolean;
  status?: RideStatus;
};

export function RideCard({
  id = "demo",
  driverName,
  rating,
  pickup,
  destination,
  date,
  time,
  seatsLeft,
  price,
  vehicle,
  verified = true,
  status = "UPCOMING",
}: RideCardProps) {
  const badge = {
    UPCOMING: "bg-green-100 text-green-700",
    OFFERED: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-gray-100 text-gray-700",
    CANCELLED: "bg-red-100 text-red-700",
  }[status];

  return (
    <Card className="p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-bold">
            {driverName[0]}
          </div>

          <div>

            <div className="flex items-center gap-2">

              <h3 className="font-semibold">
                {driverName}
              </h3>

              {verified && (
                <BadgeCheck className="h-4 w-4 text-blue-600" />
              )}

            </div>

            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {rating}
            </div>

          </div>

        </div>

        <div className="text-right">

          <div className="font-bold">
            ₹{price}/seat
          </div>

          <div className={`mt-2 rounded-full px-3 py-1 text-xs font-medium ${badge}`}>
            {status}
          </div>

        </div>

      </div>

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-2">
          <Car className="h-4 w-4" />
          {vehicle}
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-green-600" />
          {pickup}
        </div>

        <div className="ml-6">↓</div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-red-600" />
          {destination}
        </div>

        <div className="grid gap-2 md:grid-cols-3">

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {date}
          </div>

          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            {time}
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {seatsLeft} left
          </div>

        </div>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        <Button asChild>
          <Link href={`/ride-sharing/${id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        {status === "UPCOMING" && (
          <Button variant="outline">
            Cancel Booking
          </Button>
        )}

        {status === "OFFERED" && (
          <>
            <Button variant="outline">
              Edit Ride
            </Button>

            <Button variant="outline">
              Passengers
            </Button>
          </>
        )}

        {status === "COMPLETED" && (
          <Button variant="outline">
            Rate Ride
          </Button>
        )}

      </div>

    </Card>
  );
}
