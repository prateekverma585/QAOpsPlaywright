# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientApp.spec.js >> Client App Login
- Location: tests\ClientApp.spec.js:30:1

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.card-body b').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic: Ecom
      - generic [ref=e9]:
        - link " dummywebsite@rahulshettyacademy.com" [ref=e11] [cursor=pointer]:
          - /url: emailto:dummywebsite@rahulshettyacademy.com
          - generic [ref=e12]: 
          - text: dummywebsite@rahulshettyacademy.com
        - generic [ref=e13]:
          - link "" [ref=e14] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e16] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e18] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e20] [cursor=pointer]:
            - /url: "#"
  - generic [ref=e22]:
    - generic [ref=e23]:
      - heading "We Make Your Shopping Simple" [level=3]
      - heading [level=1] [ref=e24]:
        - text: Practice Website for
        - emphasis [ref=e25]: Rahul Shetty Academy
        - text: Students
      - link "Register" [ref=e26] [cursor=pointer]:
        - /url: "#/auth/register"
    - generic [ref=e28]:
      - paragraph [ref=e29]:
        - generic [ref=e30]: Register to sign in with your personal account
      - generic [ref=e31]:
        - heading "Log in" [level=1] [ref=e32]
        - generic [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]: Email
            - textbox "email@example.com" [ref=e36]: veenarecordsinc@gmail.com
          - generic [ref=e37]:
            - generic [ref=e38]: Password
            - textbox "enter your passsword" [ref=e39]: KrishnaRadha@123
          - button "Login" [active] [ref=e40] [cursor=pointer]
        - link "Forgot password?" [ref=e41] [cursor=pointer]:
          - /url: "#/auth/password-new"
        - paragraph [ref=e42] [cursor=pointer]: Don't have an account? Register here
  - generic [ref=e43]:
    - heading "Why People Choose Us?" [level=1] [ref=e46]
    - generic [ref=e47]:
      - generic [ref=e48]:
        - generic [ref=e49]: 
        - generic [ref=e51]:
          - heading "3546540" [level=1]
          - paragraph [ref=e52]: Successfull Orders
      - generic [ref=e53]:
        - generic [ref=e54]: 
        - generic [ref=e56]:
          - heading "37653" [level=1]
          - paragraph [ref=e57]: Customers
      - generic [ref=e58]:
        - generic [ref=e59]: 
        - generic [ref=e61]:
          - heading "3243" [level=1]
          - paragraph [ref=e62]: Sellers
    - generic [ref=e63]:
      - generic [ref=e64]:
        - generic [ref=e65]: 
        - generic [ref=e67]:
          - heading "4500+" [level=1]
          - paragraph [ref=e68]: Daily Orders
      - generic [ref=e69]:
        - generic [ref=e70]: 
        - generic [ref=e72]:
          - heading "500+" [level=1]
          - paragraph [ref=e73]: Daily New Customer Joining
```

# Test source

```ts
  1   | const{test, expect} = require('@playwright/test');
  2   | 
  3   | 
  4   | test('Browser Context-Validating Error Login',async ({page})=>
  5   | {           
  6   | 
  7   |             await page.goto("https://rahulshettyacademy.com/client/");
  8   | 
  9   |             await page.locator("#userEmail").fill("veenarecordsinc@gmail.com"); 
  10  |             await page.locator("#userPassword").fill("KrishnaHari@123");
  11  |             await page.locator("[type='submit']").click();
  12  |             //ex-20 : Implementing wait
  13  |             await page.waitForLoadState("networkidle");
  14  | 
  15  |             // or use belo code for wait
  16  |             // await page.locator(".card-body b").waitFor(); // this works for only one element
  17  |             // but here it's returning multiple elements, so replace with finding one element, see below
  18  |             // await page.locator(".card-body b").first().waitFor(); // you ca replace first to last
  19  | 
  20  | 
  21  | 
  22  |             const titles = await page.locator(".card-body b").allTextContents();
  23  |             console.log(titles);
  24  | 
  25  | 
  26  |             
  27  | 
  28  | });
  29  | 
  30  | test('Client App Login',async ({page})=>
  31  | {   const email = "veenarecordsinc@gmail.com";
  32  |     const products = page.locator(".card-body ");
  33  |     const productName = "ZARA COAT 3";
  34  |     await page.goto("https://rahulshettyacademy.com/client");
  35  |     await page.locator("#userEmail").fill(email);
  36  |     await page.locator("#userPassword").fill("KrishnaRadha@123");
  37  |     await page.locator("[value='Login']").click();
  38  |     await page.waitForLoadState('networkidle');
> 39  |     await page.locator(".card-body b").first().waitFor();
      |                                                ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  40  |     const titles = await page.locator(".card-body b").allTextContents();
  41  | 
  42  |     //console.log(titles);
  43  |     const count = await products.count();
  44  | 
  45  |     for(let i=0; i<count; i++)
  46  |     {
  47  |        if( await products.nth(i).locator("b").textContent() === productName)
  48  |        {
  49  |             await products.nth(i).locator("text= Add To Cart").click();
  50  |             break;
  51  |        }
  52  |     }
  53  | 
  54  |     //Ex-31
  55  |     await page.locator("[routerlink*='cart']").click();
  56  |     await page.locator("div li").first().waitFor();
  57  |     const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  58  |     expect(bool).toBeTruthy();
  59  | 
  60  |     await page.locator("text=Checkout").click();
  61  |     await page.locator("[placeholder*='Country']").pressSequentially("ind",{ delay: 150 });
  62  |     const dropdown = await page.locator(".ta-results");
  63  |     await dropdown.waitFor();
  64  |     const optionsCount = await dropdown.locator("button").count();
  65  | 
  66  |     for(let i=0; i<optionsCount; i++)
  67  |     {
  68  |         const text= await dropdown.locator("button").nth(i).textContent();
  69  |         if(text === " India")
  70  |         {
  71  |             await dropdown.locator("button").nth(i).click();
  72  |             break;
  73  |         }
  74  |     }
  75  |     await expect(page.locator(".mt-5 [type='text']").first()).toHaveText(email);
  76  | 
  77  |     const dropdown1 = page.locator('[class*=ddl]').first();
  78  |     await dropdown1.selectOption("09");
  79  | 
  80  |     const dropdown2 = page.locator('[class*=ddl]').last();
  81  |     await dropdown2.selectOption("30");
  82  | 
  83  |     await page.locator('//div[@class="payment__cc"]//div[2]//input[1]').fill("344");
  84  |     await page.locator('.form__cc [type=text]').nth(2).fill("Prateek Verma");
  85  |     await page.locator('.form__cc [type=text]').nth(3).fill("PRAT10");
  86  |     await page.locator('[class*=btn-primary]').click();
  87  | 
  88  |     await page.locator('[class*=btnn]').click();
  89  |     expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
  90  |     const order_ID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
  91  |     console.log(order_ID);
  92  | 
  93  | 
  94  |     // Navigating to orders page
  95  |     await page.locator('.btn.btn-custom').nth(1).click();
  96  |     await page.locator('tbody').waitFor();
  97  | 
  98  |     const orderRows = page.locator('.tbody tr');
  99  | 
  100 |     for(let i=0; i<orderRows.count; i++){
  101 |        const actualOrder = await orderRows.nth(i).locator('th').textContent();
  102 | 
  103 |        if(actualOrder.includes(order_ID)){
  104 |          await orderRows.nth(i).locator('[class*=btn-primary]').click();
  105 |          break;
  106 |        }
  107 |        
  108 |     }
  109 |    
  110 |     const orderDetails = page.locator('[class*=-main]').textContent();
  111 |     expect(order_ID).includes(orderDetails).toBeTruthy();
  112 | 
  113 |    
  114 |     
  115 | });
  116 | 
  117 | 
```