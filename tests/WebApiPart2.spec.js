const{test, expect,request} = require('@playwright/test');

let webContext;

test.beforeAll(async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "veenarecordsinc@gmail.com";
    const products = page.locator(".card-body ");
    const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("KrishnaRadha@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});


    // invoking a browser by injecting the json file i.e., state.json
    webContext = await browser.newContext({storageState:'state.json'});


});










test('Client App Login',async ()=>
{   
    const email = "veenarecordsinc@gmail.com";
    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();

    //console.log(titles);
    const products = page.locator(".card-body");
    const count = await products.count();

    for(let i=0; i<count; i++)
    {
       if( await products.nth(i).locator("b").textContent() === productName)
       {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
       }
    }

    //Ex-31
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{ delay: 150 });
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();

    for(let i=0; i<optionsCount; i++)
    {
        const text= await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".mt-5 [type='text']").first()).toHaveText(email);

    const dropdown1 = page.locator('[class*=ddl]').first();
    await dropdown1.selectOption("09");

    const dropdown2 = page.locator('[class*=ddl]').last();
    await dropdown2.selectOption("30");

    await page.locator('//div[@class="payment__cc"]//div[2]//input[1]').fill("344");
    await page.locator('.form__cc [type=text]').nth(2).fill("Prateek Verma");
    await page.locator('.form__cc [type=text]').nth(3).fill("PRAT10");
    await page.locator('[class*=btn-primary]').click();

    await page.locator('[class*=btnn]').click();
    expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
    const order_ID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(order_ID);


    // Navigating to orders page
    await page.locator('.btn.btn-custom').nth(1).click();
    await page.locator('tbody').waitFor();

    const orderRows = page.locator('tbody tr');
    const rowCount = await orderRows.count();

    for(let i=0; i<rowCount; i++){
       const actualOrder = await orderRows.nth(i).locator('th').textContent();

       if(order_ID.includes(actualOrder.trim())){
         await orderRows.nth(i).locator('[class*=btn-primary]').click();
         break;
       }
       
    }
    
    const detailsContainer = page.locator('.col-text');
    await detailsContainer.first().waitFor();
    const orderDetails = await detailsContainer.first().textContent();
    expect(order_ID).toContain(orderDetails.trim());
   
   
    
});

test('Test Case 2',async ()=>
{           

        const email = "veenarecordsinc@gmail.com";
        const productName = "ZARA COAT 3";
        const page = await webContext.newPage();
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator(".card-body b").first().waitFor();
        const titles = await page.locator(".card-body b").allTextContents();
        console.log(titles);       
});