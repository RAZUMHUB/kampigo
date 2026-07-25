"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ClothingFilter() {
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="grid gap-4 lg:grid-cols-6">

        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            className="pl-9"
            placeholder="Search clothes..."
          />
        </div>

        <select className="h-10 rounded-md border bg-background px-3">
          <option>All Categories</option>
          <option>Formal Wear</option>
          <option>Traditional Wear</option>
          <option>Party Wear</option>
          <option>Sports Wear</option>
          <option>Winter Wear</option>
        </select>

        <select className="h-10 rounded-md border bg-background px-3">
          <option>All Sizes</option>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
          <option>XXL</option>
        </select>

        <select className="h-10 rounded-md border bg-background px-3">
          <option>Sort By</option>
          <option>Newest</option>
          <option>Price: Low → High</option>
          <option>Price: High → Low</option>
          <option>Highest Rated</option>
        </select>

        <Button>
          Apply Filters
        </Button>

      </div>
    </div>
  );
}
