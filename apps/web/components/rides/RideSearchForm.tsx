"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function RideSearchForm() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold">Find Your Ride</h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Search rides posted by verified students.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Input placeholder="From (e.g. Parul University)" />

        <Input placeholder="To (e.g. Vadodara Railway Station)" />

        <Input type="date" />

        <Input
          type="number"
          min="1"
          max="8"
          placeholder="Seats"
        />
      </div>

      <Button className="mt-6 w-full">
        <Search className="mr-2 h-4 w-4" />
        Search Rides
      </Button>
    </Card>
  );
}
