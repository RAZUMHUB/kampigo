import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AuthGuard } from '@/components/auth/auth-guard';

const rentals = [
  {
    name: "Lehenga",
    image: "/demo/clothes/lehenga.jpeg",
    price: "₹699/day",
  },
  {
    name: "Shirt",
    image: "/demo/clothes/shirt-pink.jpeg",
    price: "₹99/day",
  },
  {
    name: "Blue Shirt",
    image: "/demo/clothes/shirt-blue.jpeg",
    price: "₹99/day",
  },
  {
    name: "Jeans",
    image: "/demo/clothes/jeans.jpeg",
    price: "₹129/day",
  },
];

export default function ClothesRentalPage() {
  return (
    <AuthGuard>
      <main className="mx-auto max-w-7xl p-8">
      <div className="mb-10 rounded-3xl border p-8">
        <h1 className="text-4xl font-bold">Campus Clothes Rental</h1>

        <p className="mt-3 text-muted-foreground">
          Rent clothes from fellow students for interviews, parties, festivals and special occasions.
        </p>

        <div className="mt-6 flex gap-4">
          <Button>
            <Link href="/clothes-rental/browse">
              Browse
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button variant="outline">
            <Link href="/clothes-rental/list-item">
              <PlusCircle className="mr-2 h-4 w-4" />
              List Item
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {rentals.map((item) => (
          <Card key={item.name} className="overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              width={500}
              height={300}
              className="h-52 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>

              <p className="mt-2 font-bold text-primary">
                {item.price}
              </p>

              <Button className="mt-4 w-full">
                Rent Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
    </AuthGuard>
  );
}