class OrderPage{

    constructor(page){

        this.page = page;
        this.firstOrder = page.locator('.btn.btn-custom');

    }

    async selectingFirstOrder(order_ID){
        await this.firstOrder.nth(1).click();
        await this.page.locator('tbody th').first().waitFor();  

        const orderRows = this.page.locator('tbody tr');

        const rowCount = await orderRows.count();

         for(let i=0; i<rowCount; i++){
               const actualOrder = await orderRows.nth(i).locator('th').textContent();
        
               if(actualOrder.includes(order_ID)){
                 await orderRows.nth(i).locator('[class*=btn-primary]').click();
                 break;
               }
               
            }
           
    }

}
module.exports = {OrderPage};