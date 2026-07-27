"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FloatingOfferRide() {
  return (
    <Link
      href="/ride-sharing/offer"
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        size="lg"
        className="h-14 rounded-full px-6 shadow-2xl"
      >
        <Plus className="mr-2 h-5 w-5" />
        Offer Ride
      </Button>
    </Link>
  );
}
