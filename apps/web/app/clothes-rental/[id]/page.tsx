import {
  Calendar,
  MapPin,
  ShieldCheck,
  Star,
  Tag,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ClothingDetailsPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 p-8">
      <div className="grid gap-10 lg:grid-cols-2">

        <Card className="flex h-[520px] items-center justify-center rounded-2xl">
          <span className="text-muted-foreground text-lg">
            Product Images
          </span>
        </Card>

        <div className="space-y-6">

          <div>
            <Badge>Available</Badge>

            <h1 className="mt-4 text-4xl font-bold">
              Black Formal Suit
            </h1>

            <p className="mt-3 text-muted-foreground">
              Premium formal suit ideal for interviews,
              presentations and placement drives.
            </p>
          </div>

          <div className="grid gap-4 rounded-xl border p-6">

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Rahul Patel
            </div>

            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              4.9 Rating
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Parul University
            </div>

            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              ₹199 / Day
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Security Deposit ₹1000
            </div>

          </div>

          <Card className="p-6 space-y-3">

            <h2 className="text-xl font-semibold">
              Product Details
            </h2>

            <p className="text-muted-foreground">
              • Category: Formal Wear
            </p>

            <p className="text-muted-foreground">
              • Size: L
            </p>

            <p className="text-muted-foreground">
              • Condition: Excellent
            </p>

            <p className="text-muted-foreground">
              • Dry Cleaned Before Every Rental
            </p>

          </Card>

          <Button className="w-full" size="lg">
            Request to Rent
          </Button>

        </div>

      </div>
    </main>
  );
}
