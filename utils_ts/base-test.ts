//import { expect, type Locator, type Page } from '@playwright/test';
import{test as baseTest} from '@playwright/test';


//const base = require('@playwright/test');

interface TestDataForOrder {
    email: string;
    password: string;
    productName: string;
}

    export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
        {   
        testDataForOrder: {
            email: "veenarecordsinc@gmail.com",
            password : "Music@123",
            productName : "ZARA COAT 3"
            }
        }

    )   