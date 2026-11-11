const{test,expect} = require('@playwright/test');

test('Security test request intercept',  async({page})=>{

            await page.goto("https://rahulshettyacademy.com/client/");
            await page.locator("#userEmail").fill("prateekverma@gmail.com"); 
            await page.locator("#userPassword").fill("Music@123");
            await page.locator("[type='submit']").click();
            await page.waitForLoadState("networkidle");
            
            await page.locator("button[routerLink*=myorders]").click();
            await page.locator('tbody').waitFor();

            await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
                route=>route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"})

            )
            await page.locator("button:has-text('View')").first().click();
            //await page.pause();
            await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");





});