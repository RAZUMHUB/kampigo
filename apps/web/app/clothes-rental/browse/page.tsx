import { ClothingCard } from "@/components/clothes/ClothingCard";
import { ClothingFilter } from "@/components/clothes/ClothingFilter";
import { AuthGuard } from '@/components/auth/auth-guard';

const clothes = [
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
    available: true,
  },
  {
    id: "2",
    title: "Navy Blue Blazer",
    category: "Formal Wear",
    size: "M",
    condition: "Good",
    owner: "Priya Shah",
    rating: 4.8,
    location: "Parul University",
    pricePerDay: 149,
    deposit: 800,
    available: true,
  },
  {
    id: "3",
    title: "Traditional Kurta Set",
    category: "Traditional Wear",
    size: "XL",
    condition: "Excellent",
    owner: "Amit Sharma",
    rating: 5.0,
    location: "Parul University",
    pricePerDay: 120,
    deposit: 600,
    available: false,
  },
];

export default function BrowseClothesPage() {
  return (
    <AuthGuard>
      <main className="mx-auto max-w-7xl space-y-8 p-8">
      <section>
        <h1 className="text-4xl font-bold">
          Browse Clothes
        </h1>

        <p className="mt-2 text-muted-foreground">
          Discover outfits shared by students across your campus.
        </p>
      </section>

      <ClothingFilter />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {clothes.map((item) => (
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