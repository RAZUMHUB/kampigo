import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ListClothingPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 p-8">
      <section>
        <h1 className="text-4xl font-bold">
          List Your Clothing
        </h1>

        <p className="mt-2 text-muted-foreground">
          Share your clothes with students and earn money.
        </p>
      </section>

      <Card className="space-y-6 p-6">

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Title
            </label>

            <Input placeholder="Black Formal Suit" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <select className="h-10 w-full rounded-md border bg-background px-3">
              <option>Formal Wear</option>
              <option>Traditional Wear</option>
              <option>Party Wear</option>
              <option>Sports Wear</option>
              <option>Winter Wear</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Size
            </label>

            <select className="h-10 w-full rounded-md border bg-background px-3">
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Condition
            </label>

            <select className="h-10 w-full rounded-md border bg-background px-3">
              <option>Like New</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Price Per Day (₹)
            </label>

            <Input type="number" placeholder="199" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Security Deposit (₹)
            </label>

            <Input type="number" placeholder="1000" />
          </div>

        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <Textarea
            rows={5}
            placeholder="Describe the clothing, fabric, fit, usage, etc."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Upload Images
          </label>

          <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground">
            Image upload will be connected later
          </div>
        </div>

        <Button size="lg" className="w-full">
          Publish Listing
        </Button>

      </Card>
    </main>
  );
}
