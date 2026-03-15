import { buildInvitePath, createInviteExpiry, createInviteToken, decryptOpaqueValue, encryptOpaqueValue, hashInviteToken, inviteInputSchema, inviteSchema, isInviteValid } from "@tripsync/domain";

describe("invite lifecycle", () => {
  it("creates a hashable invite token and path", () => {
    const { token, tokenHash } = createInviteToken();

    expect(token).toHaveLength(48);
    expect(tokenHash).toBe(hashInviteToken(token));
    expect(buildInvitePath(token)).toBe(`/invite/${token}`);
  });

  it("rejects expired or revoked invites", () => {
    const expiresAt = createInviteExpiry(1);

    expect(isInviteValid({ expiresAt, revokedAt: null, acceptedAt: null })).toBe(true);
    expect(isInviteValid({ expiresAt: new Date(Date.now() - 1000), revokedAt: null, acceptedAt: null })).toBe(false);
    expect(isInviteValid({ expiresAt, revokedAt: new Date(), acceptedAt: null })).toBe(false);
  });

  it("rejects owner invitations in the public flow", () => {
    expect(() =>
      inviteSchema.parse({
        email: "friend@example.com",
        role: "OWNER"
      })
    ).toThrow();
  });

  it("keeps the service-level invite input aligned with public role restrictions", () => {
    expect(() =>
      inviteInputSchema.parse({
        tripId: "trip_123",
        inviterId: "user_123",
        targetEmail: "friend@example.com",
        role: "OWNER",
        ttlHours: 24
      })
    ).toThrow();
  });

  it("encrypts recoverable invite links instead of storing them in plaintext", () => {
    const secret = "12345678901234567890123456789012";
    const path = "/invite/demo-token";
    const encrypted = encryptOpaqueValue(secret, path);

    expect(encrypted).not.toContain(path);
    expect(decryptOpaqueValue(secret, encrypted)).toBe(path);
  });
});
