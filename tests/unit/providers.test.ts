import { MockPlaceProvider } from "../../packages/providers/src/mock-places";

describe("mock place provider", () => {
  it("returns seeded destination matches", async () => {
    const provider = new MockPlaceProvider();
    const results = await provider.searchText({
      query: "coffee",
      destination: "tokyo"
    });

    expect(results.some((place) => place.name === "Koffee Mameya")).toBe(true);
  });

  it("falls back to filtered destination results when the default query is generic", async () => {
    const provider = new MockPlaceProvider();
    const results = await provider.searchText({
      query: "best spots",
      destination: "lisbon"
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.some((place) => place.name === "Time Out Market")).toBe(true);
  });

  it("filters nearby results", async () => {
    const provider = new MockPlaceProvider();
    const results = await provider.searchNearby({
      latitude: 35.67,
      longitude: 139.65,
      filter: "must-see"
    });

    expect(results.every((place) => place.category === "must-see")).toBe(true);
  });
});
