import { test as baseTest } from "@playwright/test";
import HomePage from "@pages/HomePage";
import AccountPage from "@pages/AccountPage";
import LoginPage from "@pages/LoginPage";
import CartPage from "@pages/CartPage";
import DetailProductPage from "@pages/DetailProduct";

type MyFixtures = {
  homePage: HomePage;
  accountPage: AccountPage;
  loginPage: LoginPage;
  cartPage: CartPage;
  detailProductPage: DetailProductPage;
};

export const test = baseTest.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  detailProductPage: async ({ page }, use) => {
    await use(new DetailProductPage(page));
  },
  // Disable API calls
  page: async ({ page }, use) => {
    await page.route(
      "https://www.youtube-nocookie.com**",
      (route) => route.abort
    );
    await page.route(
      "https://rr6---sn-8pxuuxa-q5qy.googlevideo.com**",
      (route) => route.abort
    );
    await page.route("https://analytics.google.com**", (route) =>
      route.abort()
    );
    await page.route("https://www.merchant-center-analytics.goog**", (route) =>
      route.abort()
    );
    await page.route("https://www.googleadservices.com**", (route) =>
      route.abort()
    );

    // await page.route('https://www.google.com**', route => route.abort());
    // await page.route('https://translate.googleapis.com**', route => route.abort());
    // await page.route('https://delivery-cloud.cdp.asia**', route => route.abort());
    await use(page);
  },
});

export { expect } from "@playwright/test";