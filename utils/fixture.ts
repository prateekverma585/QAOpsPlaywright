//const base = require('@playwright/test');
import { test as base, request, type Page } from '@playwright/test';
import{APIUtils} from './ApiUtils.ts';
//const{request} = require('@playwright/test');
const loginPayload : any = {userEmail: "veenarecordsinc@gmail.com", userPassword: "KrishnaRadha@123"};
const orderPayload : any = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"},
    {country:"India",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};

    type CustomFixtures = {
    authenticationPage: Page;
    createOrder: any;
    testDataForOrder: { productName: string };
};

export const customtest = base.extend<CustomFixtures>({

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

    createOrder : async({},use : any) =>{

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