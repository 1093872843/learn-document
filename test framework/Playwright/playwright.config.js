// @ts-check
const { defineConfig, devices } = require("@playwright/test");
import { config } from "dotenv";
const modeExt = process.env.MODE || "development";
// 先加载入仓的配置文件，再加载本地的配置文件
config({ path: ".env" });
config({ path: `.env.${modeExt}`, override: true });
config({ path: ".env.local", override: true });
config({ path: `.env.${modeExt}.local`, override: true });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    // 在命令行中同步打印每条用例的执行结果
    ["list"],
    // 输出 html 格式的报告，并将报告归档与指定路径
    [
      "html",
      {
        outputFolder: "playwright-report",
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.WEBSITE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // 非 CI 环境下，第一次失败重试时生成追踪信息。非 CI 环境下，总是生成追踪信息
    trace: process.env.CI ? "on-first-retry" : "on",
    // 非 CI 环境下，第一次失败重试时生成视频。非 CI 环境下，总是生成视频
    video: process.env.CI ? "on-first-retry" : "on",
  },

  /* Configure projects for major browsers */
  projects: [
    // setup 工程只执行 tests 目录下以 .setup.ts 结尾的文件。在所有正式测试执行前先完成鉴权初始化
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: ".auth/user.json" },
      // 必须在 setup 完成鉴权后执行
      // dependencies: ["setup"],
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], storageState: ".auth/user.json" },
      // 必须在 setup 完成鉴权后执行
      // dependencies: ["setup"],
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], storageState: ".auth/user.json" },
      // 必须在 setup 完成鉴权后执行
      // dependencies: ["setup"],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
