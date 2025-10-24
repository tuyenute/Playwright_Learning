import {test, expect} from '@playwright/test';
import * as allure from "allure-js-commons";

test('GET /best-sale', async ({request}) => {
    const response = await allure.step("Call API get best sale", async () => {
        return request.get(process.env.BASE_URL + '/collections/san-pham-ban-chay/products.json?include=metafields[product]&page=1&limit=8');
    }); 

    allure.step("Verify response status is 200", async () => {
        expect(response.status()).toBe(200);
    });

    allure.step("Verify response body contains 8 products", async () => {
        const body =  await response.json();
        allure.attachment("responseBody", JSON.stringify(body, null, 2), "application/json");
        expect(body.products.length).toBe(8);
    });
})

