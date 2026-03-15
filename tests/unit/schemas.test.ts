import { budgetScenarioSchema, commentSchema, createTripSchema } from "@tripsync/domain";

describe("security-sensitive schemas", () => {
  it("rejects trips whose end date is before the start date", () => {
    expect(() =>
      createTripSchema.parse({
        name: "Backwards trip",
        destinationLabel: "Tokyo, Japan",
        startDate: "2026-10-15",
        endDate: "2026-10-10",
        timezone: "Asia/Tokyo",
        currencyCode: "JPY",
        coverImageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989"
      })
    ).toThrow();
  });

  it("rejects comments that target multiple resource types", () => {
    expect(() =>
      commentSchema.parse({
        tripId: "trip_123",
        body: "Pick one target",
        savedPlaceId: "saved_1",
        itineraryItemId: "item_1"
      })
    ).toThrow();
  });

  it("bounds budget planner inputs", () => {
    expect(() =>
      budgetScenarioSchema.parse({
        preset: "COMFORT",
        nights: 0,
        groupSize: 2,
        currencyCode: "AUD"
      })
    ).toThrow();
  });
});
