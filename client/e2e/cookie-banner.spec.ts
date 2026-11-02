import { test, expect } from "@playwright/test";

const KEY = "mofaya-cookie-consent";

test.describe("cookie banner", () => {
  test("shows on first visit, hides on accept, stays hidden after reload", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Cookie consent" });
    await expect(banner).toBeVisible();

    await banner.getByRole("button", { name: "Accept all" }).click();
    await expect(banner).toBeHidden();
    expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).toBe("accepted");

    await page.reload();
    await expect(page.getByRole("dialog", { name: "Cookie consent" })).toBeHidden();
  });

  test("decline stores the choice and hides the banner", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Cookie consent" });
    await banner.getByRole("button", { name: "Decline" }).click();
    await expect(banner).toBeHidden();
    expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).toBe("declined");
  });
});
