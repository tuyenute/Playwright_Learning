import {Page} from '@playwright/test';

export default class DetailProductPage {
    readonly page: Page;
    readonly addToCartButton;
    readonly productTitle;
    readonly productPrice;
    readonly productSize;
    readonly productColor;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('#btn-addtocart');
        this.productTitle = page.locator('.pr-title');
        this.productPrice = page.locator('#pr-price');
        this.productSize = page.locator('label.aspect-ratio.sd[data-value]').nth(1);
        this.productColor = page.locator('label.aspect-ratio.sd[data-value]').first;
    }   
    async goto(productUrl: string) {
        await this.page.goto(productUrl);    
        await this.page.waitForLoadState('domcontentloaded');
    }

    async addToCartDefault() {
        await this.addToCartButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async addToCart(size: string, color: string) {
        // select size
        await this.page.locator(`label.aspect-ratio[data-value="${size}"]`).click();
        // select color
        await this.page.locator(`label.aspect-ratio[data-value="${color}"]`).click();
        await this.addToCartButton.click();
        await this.page.waitForTimeout(2000);
    }
}