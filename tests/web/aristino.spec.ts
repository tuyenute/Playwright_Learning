import { test, expect } from "@fixtures/disableAPI.fixture";
import RegisterPage from "@pages/RegisterPage";
import TestDataManager from "@data/test-data-manager";
import { allure } from 'allure-playwright';

const testDataManager = new TestDataManager();

test.describe("Verify login authentication @login @smoke", () => {
  for (const user of testDataManager.getAllUsers()) {
    // read data from test-data.json
    if (user.isPositive) {
      test("Verify user can login success @positive", async ({
        loginPage,
        accountPage,
      }) => {
        await allure.step("Navigate to login page", async () => {
          await loginPage.goto();
        });

        await allure.step("Perform login", async () => {
          await loginPage.performLogin(user);
          await allure.attachment("User info for login", JSON.stringify(user), "application/json");
        });

        await allure.step("Verify UI after login success", async () => {
          // verify logout button is visible after login success
          await expect(accountPage.logoutButton, "Logout button must be visible").toBeVisible();
        });
      });
    } else {
      test("Verify user can login fail with bad credentials @negative", async ({
        loginPage,
        accountPage,
      }) => {
        await allure.step("Navigate to login page", async () => {
          await loginPage.goto();
        });

        await allure.step("Perform login", async () => {
          await loginPage.performLogin(user);
          await allure.attachment("User info for login", JSON.stringify(user), "application/json");
        });

        await allure.step("Verify UI after login fail", async () => {
          // verify error message is shown
          await expect(loginPage.errorMessage, "Error message must show").toBeVisible();
          await expect(accountPage.logoutButton, "Logout button must not be visible").not.toBeVisible();
        });

      });
    }
  }
});
// test("Verify user can register new account", async ({ page, accountPage }) => {
//   const registerPage = new RegisterPage(page);
//   await registerPage.goto();
//   await registerPage.performRegister(
//     `plwrtst${Date.now()}@gmail.com`,
//     "Abc@123456",
//     "Tuyen",
//     "Nguyen"
//   );
//   await expect(accountPage.logoutButton).toBeVisible();
// });

test.describe("Verify search functionality @search @smoke", () => {
  allure.suite("Search");
  for (const term of testDataManager.getAllSearchTerms()) {
    if (term.isPositive) {
      test("Verify user can search product successfully @positive", async ({
        page,
        homePage,
      }) => {
        await allure.step("Navigate to home page", async () => {
          await homePage.goto();
        });

        await allure.step('Type to search input', async () => { 
          await homePage.searchIcon.click();
          await homePage.searchInput.click();
          await homePage.searchInput.type(term.searchValue, { delay: 100 });
          allure.attachment("Search input", term.searchValue, "text/plain");
        });

        await allure.step("Verify search recommend box", async () => {
          // Check recommendation dropdown have expected text
          const suggestionsBox = page.locator("#ajaxSearchPrResults");
          await expect(suggestionsBox, "Recommend box must be visible").toBeVisible({ timeout: 5000 });
          await expect(suggestionsBox, "Recommend box must have expected product").toContainText(term.recommendText);
        });

        await allure.step("Submit search", async () => {
          await homePage.searchInput.press("Enter");
          await page.waitForLoadState("domcontentloaded");
        });


        await allure.step("Verify search result page", async () => {
          const productList = page.locator(".grid-products");
          // result page contains expected products
          await expect(productList, "Result must have product").toContainText(term.recommendText);
          // result page contains expected number of products
          const resultItems = await productList.locator(".pro-tile").count();
          expect(resultItems, "Product quantity must match expected result").toBe(term.expectedQuantity);
        });
      });
    } else {
      test("Verify user can not search product with invalid input @negative", async ({
        page,
        homePage,
      }) => {
        await allure.step("Navigate to home page", async () => {
          await homePage.goto();
        });

        await allure.step('Type to search input', async () => { 
          await homePage.searchIcon.click();
          await homePage.searchInput.click();
          await homePage.searchInput.type(term.searchValue, { delay: 100 });
          allure.attachment("Search input", term.searchValue, "text/plain");
        });

        await allure.step("Verify search recommend box", async () => {
          // Check recommendation dropdown visible with no products
          const suggestionsBox = page.locator("#ajaxSearchPrResults");
          await expect(suggestionsBox).toBeVisible({ timeout: 5000 });
          await expect(page.getByText("Không có sản phẩm nào...")).toBeVisible();
        });

        await allure.step("Submit search", async () => {
          await homePage.searchInput.press("Enter");
          await page.waitForLoadState("domcontentloaded");
        });

        await allure.step("Verify search result page", async () => {
          await expect(page.locator(".grid-products"), "Result is empty").not.toBeVisible();
        });
      });
    }
  }
});


test.describe("Verify add to cart functionality @cart @smoke", () => {
  allure.suite("Add to cart");
      test("Verify user can add product to cart successfully @positive", async ({
    detailProductPage,
    cartPage,
  }) => {
    const product = testDataManager.getRandomProduct();
  
    await allure.step("Navigate to product detail page", async () => {
      await detailProductPage.goto(product.url);
    });

    await allure.step("Verify product detail information", async () => {
      // check information on detail product page
      await expect(detailProductPage.productTitle).toHaveText(product.name);
      await expect(detailProductPage.productPrice).toHaveText(product.price);
    });
  
    await allure.step("Add product to cart", async () => {
      // add to cart with specific size and color
      await detailProductPage.addToCart(product.size, product.color);
      allure.attachment(`${product.name} - ${product.size} - ${product.color}`, "Product added to cart", "text/plain");
    });
  
    await allure.step("Verify product is added to cart", async () => {
      // Verify product is added to cart
      await expect(cartPage.cartModal, "Cart modal must be visible").toBeVisible({ timeout: 10000 });
    
      const itemInfo = await cartPage.getItemInfo(1);
      // check product info in cart
      expect(itemInfo.name, "Product name must match").toContain(product.name);
      expect(itemInfo.size, "Product size must match").toContain(product.size);
      expect(itemInfo.color, "Product color must match").toContain(product.color);
    });
  });
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshot = await page.screenshot();
    await allure.attachment("Screenshot on failure", screenshot, "image/png");
    console.log(`Test failed: ${testInfo.title}`);
  } else {
    console.log(`Test passed: ${testInfo.title}`);
  }
});