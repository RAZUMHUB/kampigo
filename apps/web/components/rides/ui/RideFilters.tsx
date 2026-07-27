"use client";

import { Button } from "@/components/ui/button";

const filters = [
  "Today",
  "Tomorrow",
  "This Week",
  "Lowest Price",
  "Most Seats",
  "Verified Drivers",
];

export function RideFilters() {
  return (
    <div className="sticky top-20 z-20 mb-8 overflow-x-auto rounded-2xl border bg-background/80 p-3 backdrop-blur">
      <div className="flex gap-3">
        {filters.map((filter, index) => (
          <Button
            key={filter}
            variant={index === 0 ? "default" : "outline"}
            className="whitespace-nowrap rounded-full"
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  );
}
