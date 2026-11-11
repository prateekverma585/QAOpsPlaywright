const{test, expect} = require('@playwright/test');
const{POManager} = require('../pageObjects/POManager.js');
const{customTest} = require('../utils/base-test.js');

const dataSet = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));



for(const data of dataSet)
{
        test(`Client App Login ${data.productName}`,async ({page})=>
        {   
            const poManager = new POManager(page);

            // Calling Login page
            const loginPage = poManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(data.email,data.password);

            // Calling Dashboardpage
            const dashboardPage = poManager.getDashboardPage();
            await dashboardPage.searchForProductAddCart(data.productName);
            await dashboardPage.navigateToCart();
            
            // calling CartPage
            const cartPage = poManager.getCartPage();
            await cartPage.findAddedProduct(data.productName);
            const order_ID = await cartPage.filteringOrderCountry();


            // Navigating to orders page
            const orderPage = poManager.getOrderPage();
            await orderPage.selectingFirstOrder(order_ID);

        
            const orderDetails = await page.locator('[class*=main]').textContent();
            expect(order_ID.includes(orderDetails.trim())).toBeTruthy();

        
            
        });

        
}

customTest.only(`@Web Client App Login `,async ({page,testDataForOrder})=>
        {   
            const poManager = new POManager(page);

            // Calling Login page
            const loginPage = poManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(testDataForOrder.email,testDataForOrder.password);

            // Calling Dashboardpage
            const dashboardPage = poManager.getDashboardPage();
            await dashboardPage.searchForProductAddCart(testDataForOrder.productName);
            await dashboardPage.navigateToCart();
            
            // calling CartPage
            const cartPage = poManager.getCartPage();
            await cartPage.findAddedProduct(testDataForOrder.productName);
            const order_ID = await cartPage.filteringOrderCountry();
        });
    
