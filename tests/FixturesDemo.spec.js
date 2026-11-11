const{test, expect, request} = require('@playwright/test');
const{customtest} = require("../utils/fixture.js");



customtest('Fixture Demo',async({authenticationPage, createOrder,testDataForOrder})=>{

    await authenticationPage.goto("https://rahulshettyacademy.com/client/");
    await authenticationPage.locator(".btn.btn-custom").nth(1).click();
    await authenticationPage.locator('tbody').waitFor();
    await expect(authenticationPage.getByText(createOrder.orderID)).toBeVisible();
    console.log(testDataForOrder.productName);
});