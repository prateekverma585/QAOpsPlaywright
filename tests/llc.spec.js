const{test, expect} = require('@playwright/test');

test('Playwright Special Locator', async({page}) => {
    test.setTimeout(60000);
    //Ex-42 
    const slowExpect = expect.configure({timeout:9000});

    // Ex-38 -39
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    expect(page.locator(".navbar-brand")).toBeVisible;
    await page.locator('.form-control[name=name]').fill("Mihika Shinoy");
    await page.locator('[name=email]').fill("ms@gmail.com");
    await page.getByPlaceholder('Password').fill("Mihika@123");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    const dropdown = await page.getByLabel("Gender");
    await dropdown.selectOption("Female");
    await page.getByLabel("Employed").check();
    await page.locator("[name=bday]").fill("1994-07-30");
    await page.getByRole("button",{name : 'Submit'}).click();

    // 5 seconds default time out for expect assertions : it can be override , see below step, here slowExpect also can be used
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible({timeout: 10000});

    await page.getByRole("link",{name:"Shop"}).click(); 

    // Ex-42
    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop");

    await page.locator('app-card').filter({hasText : "Nokia Edge"}).getByRole("button",{name: "Add "}).click();



});