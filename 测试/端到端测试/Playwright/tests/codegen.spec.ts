// 通过 npm run codegen 得到的代码复制粘贴
import { test, expect } from '@playwright/test';

test.use({
  storageState: '.auth/user.json'
});

test('test', async ({ page }) => {
  await page.goto('https://ldapp-risesign.brunp.com:8550/brunp-rise-sign/m/blank/public-form/form-content?shareId=NTA4NjM3MjI3Nzg2NDM2NjA4&tenantId=502787009908047873&appId=505407578671415297');
});