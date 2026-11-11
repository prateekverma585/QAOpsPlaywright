const{test, expect, request} = require('@playwright/test');
const { APIUtils } = require('../utils/ApiUtils');

const loginPayload = {userEmail: "veenarecordsinc@gmail.com", userPassword: "KrishnaRadha@123"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"},
    {country:"India",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};

    let response;

test.beforeAll(async()=>{

    // Login Api
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload); 
    response = await apiUtils.createOrder(orderPayload);

});


test('Place the Order',async ({page})=>
{      
    await page.addInitScript(value =>
    {
        window.localStorage.setItem('token',value);
    }, response.Token );
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');

    // Navigating to orders page
    await page.locator('.btn.btn-custom').nth(1).click();
    await page.locator('tbody').waitFor();

    const orderRows = page.locator('tbody tr');
    const rowCount = await orderRows.count();
    const cleanOrderId = response.orderID.trim();

    for(let i=0; i<rowCount; i++){
       const actualOrder = await orderRows.nth(i).locator('th').textContent();

       if(cleanOrderId.includes(actualOrder.trim())){
         await orderRows.nth(i).locator('[class*=btn-primary]').click();
         break;
       }
       
    }
   
    const orderDetails = await page.locator('[class*=col-text]').first().textContent();
    expect(cleanOrderId).toContain(orderDetails.trim());
   
    
}); 



