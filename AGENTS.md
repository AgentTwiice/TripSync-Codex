# AGENTS.md

## Working agreements

- Use pnpm and strict TypeScript.
- Build production-quality code, not prototype shortcuts.
- Never expose secrets, service role keys, or third-party provider keys to the client.
- All third-party APIs must be called server-side through provider adapters.
- Enforce authorization on every trip-scoped read and write. Users may only access trips they belong to.
- Invitation tokens must expire, be revocable, and be stored hashed when practical.
- Validate all inputs with Zod.
- Never trust client-calculated permissions, trip totals, or pricing outputs.
- Prefer clean, maintainable abstractions over hacks.
- Keep the UI feeling like a premium consumer travel app, not a generic AI SaaS template.
- Do not use default shadcn styling unchanged. Create a custom design token system.
- If live API credentials are unavailable, implement mock adapters and realistic seed data so the app still runs locally.
- Add or update tests for auth, permissions, invite flow, and core trip logic when those areas change.
- After substantive changes, run: pnpm lint && pnpm typecheck && pnpm test
- Document architecture and security decisions in docs/.
