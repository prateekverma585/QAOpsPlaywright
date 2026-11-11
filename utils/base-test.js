const base = require('@playwright/test');

    exports.customTest = base.test.extend(
        {   
        testDataForOrder: {
            email: "veenarecordsinc@gmail.com",
            password : "Music@123",
            productName : "ZARA COAT 3"
            }
        }

    )   