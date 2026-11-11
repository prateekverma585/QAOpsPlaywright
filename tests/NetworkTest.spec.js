const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/ApiUtils');

const loginPayload = { userEmail: "veenarecordsinc@gmail.com", userPassword: "KrishnaRadha@123" };
const orderPayload = {
    orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" },
    { country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5" }]
};
const fakePayloadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {

    // Login Api
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});


test('Place the Order', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.Token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');

    //Ex-69
    // Mocking network response
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {

            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill(
                {
                    response,
                    body,
                }
            )

            // intercepting response -> APi-response -> hijack and enter the fake response (playwright fake response) and send fake 
            // response -> browser -> render the data on front end
        });

    // Navigating to orders page
    await page.locator('.btn.btn-custom').nth(1).click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    //await page.pause(); 
    console.log(await page.locator(".mt-4").textContent());
    //await page.locator('tbody').waitFor();  


});



