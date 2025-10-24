import { Page, Locator } from "@playwright/test";

export type ItemInfo = {
  name: string;
  size: string;
  color: string;
};
export default class CartPage {
  readonly page: Page;
  readonly closeButton: Locator;
  readonly cartModal: Locator;

  constructor(page: Page) {
    this.page = page;
    // Initialize locators using class selectors
    this.closeButton = this.page.locator("button.close-sidebar");
    this.cartModal = this.page.locator(".sidebar-nav");
  }

  async closeCart() {
    await this.closeButton.click();
  }

  async getItemInfo(index: number): Promise<ItemInfo> {
    const item = this.page.locator(`[data-line="${index}"]`);
    const name = await item.locator(".item-desc h3").innerText();
    const variants = item.locator(".list-variant select");

    const color = await variants.first().locator("option:checked").innerText();
    const size = await variants.last().locator("option:checked").innerText();

    return { name, size, color };
  }
}
