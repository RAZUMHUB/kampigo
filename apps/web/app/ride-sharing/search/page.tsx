"use client";

import { useState } from "react";

import { RideSearchForm } from "@/components/rides/RideSearchForm";
import { RideCard } from "@/components/rides/RideCard";
import { RideFilters } from "@/components/rides/ui/RideFilters";
import { RideCardSkeleton } from "@/components/rides/ui/RideCardSkeleton";
import { EmptyRides } from "@/components/rides/ui/EmptyRides";
import { useRides } from "@/hooks/use-rides";

export default function RideSearchPage() {
  const [query, setQuery] = useState("");
  const { data, isLoading, error } = useRides(query);

  return (
    <main className="mx-auto max-w-7xl p-8 space-y-8">
      <RideSearchForm onSearch={setQuery} />

      <RideFilters />

      {isLoading && (
        <div className="space-y-6">
          <RideCardSkeleton />
          <RideCardSkeleton />
          <RideCardSkeleton />
        </div>
      )}

      {!isLoading && error && (
        <EmptyRides
          title="Unable to load rides"
          description="Please try again in a few moments."
        />
      )}

      {!isLoading &&
        !error &&
        data?.rides?.length === 0 && (
          <EmptyRides />
        )}

      {!isLoading &&
        !error &&
        data?.rides?.map((ride) => (
          <RideCard
            key={ride.id}
            id={ride.id}
            driverName={ride.driver.displayName}
            rating={5}
            pickup={ride.pickup}
            destination={ride.destination}
            date={new Date(
              ride.departureDateTime
            ).toLocaleDateString()}
            time={new Date(
              ride.departureDateTime
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            seatsLeft={ride.availableSeats}
            price={ride.pricePerSeat}
            vehicle={ride.vehicle}
          />
        ))}
    </main>
  );
}
