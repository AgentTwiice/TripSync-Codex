import { assertTripCapability, inviteSchema } from "@tripsync/domain";

describe("role enforcement", () => {
  it("prevents viewers from changing budget scenarios", () => {
    expect(() => assertTripCapability("VIEWER", "trip:budget")).toThrow();
  });

  it("allows editors to comment and vote", () => {
    expect(() => assertTripCapability("EDITOR", "trip:comment")).not.toThrow();
    expect(() => assertTripCapability("EDITOR", "trip:vote")).not.toThrow();
  });

  it("limits public invite roles to editor or viewer", () => {
    expect(() => inviteSchema.parse({ role: "EDITOR" })).not.toThrow();
    expect(() => inviteSchema.parse({ role: "VIEWER" })).not.toThrow();
  });
});
