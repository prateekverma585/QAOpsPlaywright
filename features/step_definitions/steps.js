const {Given, When, Then} = require('@cucumber/cucumber');
const assert = require('assert');
const{POManager} = require('../../pageObjects/POManager');
const{test, expect} = require('@playwright/test');
const playwright = require('@playwright/test');


Given('a login to Ecommerce application with {string} and {string}',{timeout:40*1000},async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
            
  
              // Calling Login page
              const loginPage = this.poManager.getLoginPage();
              await loginPage.goTo();
              await loginPage.validLogin(username,password);

 // return 'pending';
});

When('Add {string} to cart', {timeout:30*1000},async function (productName) {
  // Write code here that turns the phrase above into concrete actions

            this.dashboardPage = this.poManager.getDashboardPage();
            await this.dashboardPage.searchForProductAddCart(productName);
            await this.dashboardPage.navigateToCart();
  //return 'pending';
});

Then('Verify {string} is displayed in the cart',{timeout:30*1000},async function (productName) {
  // Write code here that turns the phrase above into concrete actions
            const cartPage = this.poManager.getCartPage();
            await cartPage.findAddedProduct(productName);
            this.order_ID = await cartPage.filteringOrderCountry();

  //return 'pending';
});

When('Enter valid details and Place the order',async function () {
  // Write code here that turns the phrase above into concrete actions
            const orderPage = this.poManager.getOrderPage();
            await orderPage.selectingFirstOrder(this.order_ID);
  //return 'pending';
});

Then('Verify order id present in the OrderHistory', async function () {
  // Write code here that turns the phrase above into concrete actions
           const orderDetails = await this.page.locator('[class*=main]').textContent();
            expect(this.order_ID.includes(orderDetails.trim())).toBeTruthy();
//  return 'pending';
});

Given('a login to Ecommerce2 application with {string} and {string}',{timeout:40*1000},async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
            const userName = this.page.locator("#username"); 
            const signInBtn = this.page.locator("#signInBtn");
            const passWord = this.page.locator("[type='password']");
  
            await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            
            await userName.fill(username);
            await passWord.fill(password);
            await signInBtn.click();
            
          
//  // return 'pending';
});

Then('Verify error message is displayed',async function(){

            console.log(await this.page.locator("[style*=block]").textContent());
            await expect(this.page.locator("[style*=block]")).toContainText("Incorrect");
  

});



          