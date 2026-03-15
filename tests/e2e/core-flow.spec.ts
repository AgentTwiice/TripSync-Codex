import { test, expect } from "@playwright/test";

test("create trip to shortlist and itinerary flow", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Demo access" }).click();

  await page.waitForURL("**/trips");
  await page.getByRole("link", { name: "Create trip" }).click();

  await page.getByLabel("Name").fill("Lisbon food week");
  await page.getByLabel("Destination").fill("Lisbon, Portugal");
  await page.getByLabel("Start date").fill("2026-05-12");
  await page.getByLabel("End date").fill("2026-05-17");
  await page.getByRole("button", { name: "Create trip" }).click();

  await page.waitForURL("**/trips/**");
  await page.getByPlaceholder("friend@example.com").fill("newfriend@example.com");
  await page.getByRole("button", { name: "Invite" }).click();

  await page.getByRole("link", { name: "Explore" }).click();
  await page.getByRole("button", { name: "Save" }).first().click();

  await page.getByRole("link", { name: "Itinerary" }).click();
  await page.getByPlaceholder("Dinner near the canal").fill("Sunset dinner");
  await page.getByRole("button", { name: "Add itinerary item" }).click();

  await expect(page.getByText("Sunset dinner")).toBeVisible();
});
