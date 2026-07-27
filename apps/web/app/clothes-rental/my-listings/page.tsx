import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { ClothingCard } from "@/components/clothes/ClothingCard";
import { Button } from "@/components/ui/button";
import { AuthGuard } from '@/components/auth/auth-guard';

const listings = [
  {
    id: "1",
    title: "Black Formal Suit",
    category: "Formal Wear",
    size: "L",
    condition: "Excellent",
    owner: "You",
    rating: 5,
    location: "Parul University",
    pricePerDay: 199,
    deposit: 1000,
    available: true,
  },
  {
    id: "2",
    title: "Blue Blazer",
    category: "Formal Wear",
    size: "M",
    condition: "Good",
    owner: "You",
    rating: 5,
    location: "Parul University",
    pricePerDay: 149,
    deposit: 800,
    available: false,
  },
];

export default function MyListingsPage() {
  return (
    <AuthGuard>
      <main className="mx-auto max-w-7xl space-y-8 p-8">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            My Listings
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage all the clothes you&apos;ve listed for rent.
          </p>
        </div>

        <Button size="lg">
          <Link href="/clothes-rental/list-item">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Listing
          </Link>
        </Button>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((item) => (
          <ClothingCard
            key={item.id}
            {...item}
          />
        ))}
      </section>
    </main>
    </AuthGuard>
  );
}