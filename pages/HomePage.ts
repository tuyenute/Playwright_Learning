import { Page } from '@playwright/test';
export default class HomePage {
    readonly page: Page;
    readonly accountIcon;
    readonly searchIcon;
    readonly cartIcon;
    readonly wishlistIcon;
    readonly searchInput;
    readonly closeSearchButton;
    readonly closePopupButton;
    readonly closeCartButton;

    constructor(page: Page) {
        this.page = page;
        this.accountIcon = page.locator('.action-account');
        this.searchIcon = page.locator('#js-click-search');
        this.cartIcon = page.locator('.action-cart');
        this.wishlistIcon = page.locator('.action-wishlist');
        this.searchInput = page.getByRole('textbox', { name: 'Bạn cần tìm gì?' })
        this.closeSearchButton = page.locator('#js-click-search-close');
        this.closePopupButton = page.getByRole('button', { name: 'Bỏ qua' });
        this.closeCartButton = page.locator('.close-sidebar');
    }

    async goto() {
        await this.page.goto('/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async performSearch(query: string) {
        await this.searchIcon.click();
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter');

        await this.page.waitForLoadState('domcontentloaded');
    }
}