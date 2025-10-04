const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/test/reset");
    await request.post("/api/users", {
      data: {
        username: "admin",
        name: "admin",
        password: "admin123",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.getByLabel("username:")).toBeVisible();
    await expect(page.getByLabel("password:")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("username:").fill('admin')
      await page.getByLabel("password:").fill('admin123')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('admin has logged in')).toBeVisible()
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("username:").fill('admin')
      await page.getByLabel("password:").fill('wrong')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('admin has logged in')).not.toBeVisible()
    });
  });
});
