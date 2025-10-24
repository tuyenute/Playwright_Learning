import { Page, Locator } from '@playwright/test';

export default class AccountPage {
    readonly page: Page;
    readonly welcomeText: Locator;
    readonly logoutButton: Locator;
    readonly emailField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeText = page.locator('div.name');
        this.logoutButton = page.getByRole('link', { name: 'Đăng xuất' });
        this.emailField = page.locator('#email');
    }

    async goto() {
        await this.page.goto('/account', { waitUntil: 'domcontentloaded' });
    }

    async logout() {
        await this.logoutButton.click();
    }
}
