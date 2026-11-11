import { expect, type Locator, type Page } from '@playwright/test';

//const { expect } = require('@playwright/test');

class APIUtils
{   

    apiContext : any;
    loginPayload : any;

    constructor(apiContext :any ,loginPayload :any )
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }


    async getToken(){

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        { 

            data : this.loginPayload

        }   
               
    )
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const Token = loginResponseJson.token;
        console.log(Token);
        return Token;
    }


    async createOrder(orderPayload : any){

        let response :any ={};
        response.Token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data : orderPayload,
                headers : {
                    'Authorization' : response.Token,
                    'Content-Type' : 'application/json'
                    
                }
            })
            const orderResponseJson = await orderResponse.json();
            const  orderID = orderResponseJson.orders[0];
            response.orderID = orderID;
            return response;

    }

}

module.exports = { APIUtils };