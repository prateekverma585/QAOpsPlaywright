const { Before,After,BeforeStep,AfterStep,Status } = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
const{POManager} = require('../../pageObjects/POManager');


Before(async function () {


    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.poManager = new POManager(this.page);


});

After(async function(){
    console.log("I'm last to execute");

});

AfterStep(async function ({ result }) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({path:'screenshot1.png'});
  }
});