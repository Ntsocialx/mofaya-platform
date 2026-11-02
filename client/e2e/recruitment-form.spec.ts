import { test, expect, type Page } from "@playwright/test";

const VALID = {
  firstName: "Thandi",
  surname: "Mokoena",
  email: "thandi@student.ac.za",
  phone: "+27 82 123 4567",
  faculty: "Economic & Management Sciences",
  studentNumber: "220012345",
  portfolioUrl: "https://example.com/cv.pdf",
};

async function fillForm(page: Page) {
  const form = page.getByRole("form", { name: "Campus Marketer application" });
  await form.getByLabel(/^Name/).fill(VALID.firstName);
  await form.getByLabel(/^Surname/).fill(VALID.surname);
  await form.getByLabel(/^Email/).fill(VALID.email);
  await form.getByLabel(/^Phone number/).fill(VALID.phone);
  await form.getByLabel(/^University \/ Institution/).selectOption("University of Johannesburg");
  await form.getByLabel(/^Faculty/).fill(VALID.faculty);
  await form.getByLabel(/^Year of study/).selectOption("2nd year");
  await form.getByLabel(/^Student number/).fill(VALID.studentNumber);
  await form.getByLabel(/^CV \/ Portfolio link/).fill(VALID.portfolioUrl);
  await form.getByRole("checkbox").check();
  return form;
}

test.beforeEach(async ({ page }) => {
  // Dismiss the cookie banner up front so it can't overlay the submit button.
  await page.addInitScript(() => localStorage.setItem("mofaya-cookie-consent", "accepted"));
});

test("submits a valid application and shows confirmation", async ({ page }) => {
  let payload: Record<string, unknown> | undefined;
  await page.route("**/api/recruitment", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({ status: 201, json: { ok: true, forwarded: true } });
  });

  await page.goto("/#join");
  const form = await fillForm(page);
  await form.getByRole("button", { name: "Submit application" }).click();

  await expect(page.getByRole("status")).toContainText("You're in the running!");
  expect(payload).toMatchObject({
    ...VALID,
    institution: "University of Johannesburg",
    studyYear: "2nd year",
    consent: true,
  });
});

test("shows server validation errors next to fields", async ({ page }) => {
  await page.route("**/api/recruitment", (route) =>
    route.fulfill({ status: 422, json: { ok: false, errors: { email: "Enter a valid email" } } }),
  );

  await page.goto("/#join");
  const form = await fillForm(page);
  await form.getByRole("button", { name: "Submit application" }).click();

  await expect(form.getByText("Enter a valid email")).toBeVisible();
  await expect(form.getByLabel(/^Email/)).toHaveAttribute("aria-invalid", "true");
  await expect(form.getByRole("alert")).toContainText("Please fix the highlighted fields.");
});

test("shows a network error when the server is unreachable", async ({ page }) => {
  await page.route("**/api/recruitment", (route) => route.abort("connectionrefused"));

  await page.goto("/#join");
  const form = await fillForm(page);
  await form.getByRole("button", { name: "Submit application" }).click();

  await expect(form.getByRole("alert")).toContainText("couldn't reach the server");
});
