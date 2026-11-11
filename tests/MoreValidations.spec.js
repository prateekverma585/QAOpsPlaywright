import {test,expect} from '@playwright/test';
import { text } from 'node:stream/consumers';

const BASE_URL = "https://rahulshettyacademy.com/AutomationPractice/";

test.describe.configure({mode: 'parallel'}); // runs the tests parallely
//test.describe.configure({mode:'serial'}); //

test('@Web Popup Validations', async({page})=>{
    await page.goto(`${BASE_URL}/`);
    // await page.goto("https://www.google.com");
    // await page.goBack();
    // await page.goForward();
    // await page.goBack();

    // to be Visible and to be hidden
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.locator("#confirmbtn").click();
    page.on('dialog',dialog=> dialog.accept());
    //page.on('dialog',dialog=> dialog.dismiss());

    //hover
    await page.locator("#mousehover").hover();   


    //iframes
    const framesPage =  page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*=lifetime-access]:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    const intText = textCheck.split(" ")[1];
    console.log(intText);


});


test('Screenshot and Visual Comparision',async({page})=>{

    await page.goto(`${BASE_URL}/`);
    await expect(page.locator("#displayed-text")).toBeVisible();

    // Partial Screenshot
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();

    // Complete screenshot
    await page.screenshot({path:'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test('Visual Screenshot Comparision', async({page})=>{

    await page.goto("https://www.google.com");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});