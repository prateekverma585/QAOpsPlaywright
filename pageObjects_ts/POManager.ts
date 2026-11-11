import { expect, type Locator, type Page } from '@playwright/test';

//const{LoginPage} = require('../pageObjects/LoginPage');
import{LoginPage} from './LoginPage';

//const{DashboardPage} = require('../pageObjects/DashboardPage');
import{DashboardPage} from './DashboardPage';

//const{CartPage} = require('../pageObjects/CartPage');
import{CartPage} from './CartPage';

//const{OrderPage} = require('../pageObjects/OrderPage');
import{OrderPage} from './OrderPage';

export class POManager{

        page : Page;
        loginPage : LoginPage;
        dashboardPage : DashboardPage;
        cartPage : CartPage;
        orderPage : OrderPage;


    constructor(page : any ){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderPage = new OrderPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;

    }

    getCartPage(){
        return this.cartPage;
    }

    getOrderPage(){
        return this.orderPage;
    }

}
module.exports = {POManager};