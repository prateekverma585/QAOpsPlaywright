const{LoginPage} = require('../pageObjects/LoginPage');
const{DashboardPage} = require('../pageObjects/DashboardPage');
const{CartPage} = require('../pageObjects/CartPage');
const{OrderPage} = require('../pageObjects/OrderPage');

class POManager{


    constructor(page){
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