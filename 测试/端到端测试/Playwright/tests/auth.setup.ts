// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
  // 输入账号、密码、点击登录
  await page.goto('/login');
  await page.getByLabel('Username or email address').fill(process.env.TEST_USERNAME || '');
  await page.getByLabel('Password').fill(process.env.TEST_PASSWORD || '');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://github.com/');

  // End of authentication steps.
  // 将登录成功后的浏览器状态存入本地文件
  await page.context().storageState({ path: authFile });
});

