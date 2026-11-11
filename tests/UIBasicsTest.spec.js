const{test, expect} = require('@playwright/test');


test('@Web Browser Context Playwright Test',async ({browser})=>
{           

            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

            const userName = page.locator("#username"); 
            const signInBtn = page.locator("#signInBtn");
            const passWord = page.locator("[type='password']");
            const cardTitles = page.locator(".card-body a");

            await userName.fill("Prateek Verma");
            await passWord.fill("Music@123");
            await signInBtn.click();
            console.log(await page.locator("[style*=block]").textContent());
            await expect(page.locator("[style*=block]")).toContainText("Incorrect");

            //Clearing the input from the text field and filling again the another value
            await userName.fill("");
            await userName.fill("rahulshettyacademy");
            await passWord.fill("");
            await passWord.fill("Learning@830$3mK2");
            await signInBtn.click();

            //ex:17
            console.log(await cardTitles.first().textContent());
            console.log(await cardTitles.nth(1).textContent());
            //ex-18 : capturing all the titles in the list
            const allTitles = await cardTitles.allTextContents();
            console.log(allTitles);
});

test('Page Playwright Test', async ({page})=>
{
    await page.goto("https://google.com");
    //get the title and put the assertions
    console.log(await page.title());
    await expect(page).toHaveTitle("Google")
}
);

test('@Web UI Controls', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username").fill("rahulshettyacademy"); 
    const signInBtn = page.locator("#signInBtn").fill("Learning@830$3mK2");
    const documentLink = page.locator([href*='documents-request']);

    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    

    //Ex-22 & 23
    // This can also be use to see wheather the radio button is checked or not
    console.log(await page.locator(".radiotextsty").last().isChecked());// returns boolean value


    // Verifying that radion button is cehcked :: this is preferred as we won't see logs all the time
   await expect(page.locator(".radiotextsty").last()).toBeChecked();
   await page.locator("[name ='terms']").click();
   await expect(page.locator("[name ='terms']")).toBeChecked();

   //to uncheck
   await page.locator("[name ='terms']").uncheck();
   expect(await page.locator("[name ='terms']").isChecked()).toBeFalsy();

   //Ex-24 // Use of await and verifying blinking text
   await expect(documentLink).toHaveAttribute("class","blinkingText");

    // This is used to pause the script for debugging purposes
    //await page.pause();
}
);

test('Child Window Handeling', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    
    // Ex-26
    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),]
    )
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain); 
    await page.bringToFront();// this wll bring back the script to the parent page
    //await page.pause();// And then it pauses

    // Ex-27 : once the value which had been fed into the page it can only be visible through inputValue
    console.log(await page.locator("#username").inputValue());


}
);