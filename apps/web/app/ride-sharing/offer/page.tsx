import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function OfferRidePage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">Offer a Ride</h1>

      <p className="mt-2 text-muted-foreground">
        Publish your trip so other students can join you.
      </p>

      <Card className="mt-8 p-6 space-y-5">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Pickup Location
          </label>
          <Input placeholder="Parul University" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Destination
          </label>
          <Input placeholder="Vadodara Railway Station" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Travel Date
            </label>

            <Input type="date" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Departure Time
            </label>

            <Input type="time" />
          </div>

        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Available Seats
            </label>

            <Input
              type="number"
              min="1"
              max="8"
              placeholder="3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Price per Seat (₹)
            </label>

            <Input
              type="number"
              placeholder="120"
            />
          </div>

        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Vehicle Details
          </label>

          <Input placeholder="Swift Dzire • White • GJ06AB1234" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Additional Notes
          </label>

          <Textarea
            placeholder="Pickup gate, luggage info, contact instructions..."
          />
        </div>

        <Button className="w-full">
          Publish Ride
        </Button>

      </Card>
    </main>
  );
}
