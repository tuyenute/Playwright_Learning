import { Page } from '@playwright/test';

export default class RegisterPage {
    readonly page: Page;
    readonly emailInput;
    readonly passwordInput;
    readonly firstNameInput;
    readonly lastNameInput;
    readonly agreeCheckbox;
    readonly registerButton;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email*' });
        this.passwordInput = page.getByRole('textbox', { name: 'Mật khẩu*' });
        this.firstNameInput = page.getByRole('textbox', { name: 'Tên*' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Họ*' });
        this.agreeCheckbox = page.getByRole('checkbox', { name: 'Tôi đồng ý với điều khoản v' });
        this.registerButton = page.getByRole('button', { name: 'REGISTER' });
    }

    async goto() {
        await this.page.goto('https://aristino.com/account/register');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async performRegister(email: string, password: string, firstName: string, lastName: string) {
        await this.emailInput.pressSequentially(email, {delay: this.randomDelay()});
        await this.passwordInput.pressSequentially(password, {delay: this.randomDelay()});
        await this.firstNameInput.pressSequentially(firstName, {delay: this.randomDelay()});
        await this.lastNameInput.pressSequentially(lastName, {delay: this.randomDelay()});

        // Ensure the agreement checkbox is checked before registering
        if (!(await this.agreeCheckbox.isChecked())) {
            await this.agreeCheckbox.check();
        }

        await this.registerButton.click();

        await this.page.waitForLoadState('domcontentloaded');
    }

    randomDelay(){
        return Math.floor(Math.random() * 200) + 50;
    }
}