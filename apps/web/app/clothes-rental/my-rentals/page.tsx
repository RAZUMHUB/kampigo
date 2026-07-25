import { ClothingCard } from "@/components/clothes/ClothingCard";

const activeRentals = [
  {
    id: "1",
    title: "Black Formal Suit",
    category: "Formal Wear",
    size: "L",
    condition: "Excellent",
    owner: "Rahul Patel",
    rating: 4.9,
    location: "Parul University",
    pricePerDay: 199,
    deposit: 1000,
    available: false,
  },
];

const completedRentals = [
  {
    id: "2",
    title: "Traditional Kurta",
    category: "Traditional Wear",
    size: "XL",
    condition: "Excellent",
    owner: "Amit Sharma",
    rating: 5.0,
    location: "Parul University",
    pricePerDay: 120,
    deposit: 600,
    available: true,
  },
];

export default function MyRentalsPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-12 p-8">
      <section>
        <h1 className="text-4xl font-bold">
          My Rentals
        </h1>

        <p className="mt-2 text-muted-foreground">
          Track your rented clothes and rental history.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Active Rentals
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {activeRentals.map((item) => (
            <ClothingCard
              key={item.id}
              {...item}
            />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Completed Rentals
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {completedRentals.map((item) => (
            <ClothingCard
              key={item.id}
              {...item}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
