import { assertTripCapability, hasTripCapability } from "@tripsync/domain";

describe("trip permissions", () => {
  it("allows owners to invite", () => {
    expect(hasTripCapability("OWNER", "trip:invite")).toBe(true);
  });

  it("blocks viewers from editing", () => {
    expect(hasTripCapability("VIEWER", "trip:edit")).toBe(false);
    expect(() => assertTripCapability("VIEWER", "trip:edit")).toThrow("Role VIEWER cannot perform trip:edit");
  });
});
