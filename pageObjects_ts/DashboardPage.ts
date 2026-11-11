import {test, expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage
{
        products: Locator;
        productsText : Locator;
        cart : Locator;
        placeOrder : Locator;


    constructor(page : any)
    {

        this.products = page.locator(".card-body ");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.placeOrder = page.locator('[class*=btnn]');

    }

    async searchForProductAddCart(productName:string){
        
            await this.products.first().waitFor();
            const titles = await this.productsText.allTextContents();
        
            //console.log(titles);
            const count = await this.products.count();
        
            for(let i=0; i<count; i++)
            {
               if( await this.products.nth(i).locator("b").textContent() === productName)
               {
                    await this.products.nth(i).locator("text= Add To Cart").click();
                    break;
               }
            }
        
    }

    async navigateToCart()
    {
        await this.cart.click();
    }

}
module.exports = {DashboardPage};