const base = require('@playwright/test'); 
const {APIUtils} = require('./ApiUtils.js');
const{request} = require('@playwright/test');
const loginPayload = {userEmail: "veenarecordsinc@gmail.com", userPassword: "KrishnaRadha@123"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"},
    {country:"India",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};

exports.customtest = base.test.extend({

    authenticationPage: async ({browser},use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client/");
        await page.locator("#userEmail").fill("veenarecordsinc@gmail.com");
        await page.locator("#userPassword").fill("KrishnaRadha@123");
        await page.locator("[type='submit']").click();
        await page.waitForLoadState("networkidle");
        await use(page);
        await context.close();
    },

    createOrder : async({},use) =>{

        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext,loginPayload); 
        const response = await apiUtils.createOrder(orderPayload);
        await use(response);
        await apiContext.dispose();
    },
    
    testDataForOrder : {
        
        productName : 'ZARA COAT 3',
    }
});