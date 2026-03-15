import { buildBudgetLineItems, calculateBudgetTotals } from "@tripsync/domain";

describe("budget calculations", () => {
  it("builds deterministic totals from a preset", () => {
    const lineItems = buildBudgetLineItems({
      preset: "COMFORT",
      nights: 4,
      groupSize: 2,
      currencyCode: "AUD"
    });
    const totals = calculateBudgetTotals(lineItems, 2);

    expect(lineItems).toHaveLength(6);
    expect(totals.totalMinor).toBeGreaterThan(0);
    expect(totals.perPersonMinor).toBe(Math.round(totals.totalMinor / 2));
  });

  it("respects manual overrides", () => {
    const lineItems = buildBudgetLineItems({
      preset: "BUDGET",
      nights: 3,
      groupSize: 2,
      currencyCode: "EUR",
      overrides: {
        flights: 99999
      }
    });

    expect(lineItems.find((item) => item.category === "flights")?.amountMinor).toBe(99999);
  });
});
