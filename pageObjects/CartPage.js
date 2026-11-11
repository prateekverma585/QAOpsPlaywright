const {expect} = require('@playwright/test');

class CartPage
{
    constructor(page){

        this.page = page;
        this.checkout = page.locator("text=Checkout");
        this.dropdownResults = page.locator(".ta-results");
        this.placeOrder = page.locator('[class*=btnn]');
        

    }
    
    async findAddedProduct(productName){
        await this.page.locator("div li").first().waitFor();
        const bool = await this.page.locator(`h3:has-text("${productName}")`).isVisible();
        expect(bool).toBeTruthy();
        await this.checkout.click();
    }


    async filteringOrderCountry(){

        await this.page.locator("[placeholder*='Country']").pressSequentially("ind",{ delay: 150 });
            const dropdown = await this.dropdownResults;
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


                await this.page.locator('//div[@class="payment__cc"]//div[2]//input[1]').fill("344");
                await this.page.locator('.form__cc [type=text]').nth(2).fill("Prateek Verma");
                await this.page.locator('.form__cc [type=text]').nth(3).fill("PRAT10");
                await this.page.locator('[class*=btn-primary]').click();

                await this.placeOrder.click();

                await expect(this.page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
                const order_ID = await this.page.locator('.em-spacer-1 .ng-star-inserted').textContent();
                //console.log(order_ID);


        return order_ID.replaceAll('|', '').trim();

    }
    





}
module.exports = {CartPage};