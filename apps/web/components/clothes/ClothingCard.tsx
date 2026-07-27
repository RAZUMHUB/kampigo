import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Heart,
  MapPin,
  ShieldCheck,
  Star,
  Tag,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ClothingCardProps = {
  id?: string;
  title: string;
  category: string;
  size: string;
  condition: string;
  owner: string;
  rating: number;
  location: string;
  pricePerDay: number;
  deposit: number;
  available: boolean;
};

export function ClothingCard({
  id = "demo",
  title,
  category,
  size,
  condition,
  owner,
  rating,
  location,
  pricePerDay,
  deposit,
  available,
}: ClothingCardProps) {
  return (
    <Card className="overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">
          Image Coming Soon
        </span>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-3 top-3 rounded-full"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>

            <p className="text-sm text-muted-foreground">
              {category}
            </p>
          </div>

          <Badge variant={available ? "default" : "secondary"}>
            {available ? "Available" : "Rented"}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{size}</Badge>
          <Badge variant="outline">{condition}</Badge>
        </div>

        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            {owner}
          </div>

          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {rating}
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {location}
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <div className="flex items-center gap-1 font-bold">
              <Tag className="h-4 w-4" />
              ₹{pricePerDay}/day
            </div>

            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Deposit ₹{deposit}
            </div>
          </div>

          <Button>
            <Link href={`/clothes-rental/${id}`}>
              View
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
