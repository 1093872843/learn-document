// @ts-check
const { test, expect } = require('@playwright/test');

test('访问 github 个人中心', async ({ page }) => {
  await page.goto(`/${process.env.TEST_USERNAME}`);
});
