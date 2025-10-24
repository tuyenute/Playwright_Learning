import {Page} from '@playwright/test';
import { User } from '../data/type';

export default class LoginPage {
    readonly page: Page;
    readonly usernameInput;
    readonly passwordInput;
    readonly loginButton;
    readonly errorMessage;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Email*' });
        this.passwordInput = page.getByRole('textbox', { name: 'Mật Khẩu*' });
        this.loginButton = page.getByRole('button', { name: 'Đăng nhập' });
        this.errorMessage = page.getByText('Thông tin đăng nhập không hợp');
    }

    async goto() {
        await this.page.goto('/account/login', { waitUntil: 'domcontentloaded' });
    }

    async performLogin(user: User) {
        await this.usernameInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.loginButton.click();

        await this.page.waitForLoadState('domcontentloaded');
    }
}