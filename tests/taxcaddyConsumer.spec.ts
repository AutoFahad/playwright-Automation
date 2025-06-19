import {test, expect} from '@playwright/test'
import { argosScreenshot } from "@argos-ci/playwright";



test.beforeEach(async ({page}) => {
    await page.goto('https://stage-consumer.taxcaddy.com/#/login');
    await page.locator('#email').fill('taxcaddyautomation+817226@gmail.com');
    await page.locator('#password').fill('Abcd@12345');
    await page.locator('button', {hasText: 'Sign In'}).click();
    
})

test('TaxCaddy Consumer - Verify Dashboard', async ({page}) => {
   

     await expect(page).toHaveTitle(/TaxCaddy/);
     await page.locator('button:text("Got it")').click();
     await page.locator('.CRjrc').click();
     await page.locator(':text("ashjasd")').click();
    
     // const frame = page.frameLocator('[aria-live="polite"] iframe')
     const frame = page.frameLocator('iframe[src*="foxit"]'); 
     await argosScreenshot(page, "homepage");

     // some quick assertion if I can get attribute values should return visibility: hidden
     const getattr = await frame.locator('[fieldname="SchE_PropertyLocation"]').locator('div').first().getAttribute('style');
     console.log(getattr);

     //Reusing locator to click on the first field in the PDF
     const firstFieldPDF = await frame.locator('[fieldname="SchE_PropertyLocation"]').locator('div').first().locator('input').first()
     const secondFieldPDF = await frame.locator('[fieldname="SchE_TypeOfProperty"]').locator('div').first().locator('input').first();
    //Type in first field
     await firstFieldPDF.click({force: true});
     await firstFieldPDF.pressSequentially('Test Property Location', {delay: 100});
     //Type in second field
     await secondFieldPDF.click({force: true});
     await secondFieldPDF.pressSequentially('Test Description', {delay: 100});

     //hover mouse over the initial dom
        await page.locator('.CRjrc').hover();
        await argosScreenshot(page, "homepage");



     
     
     
    
  
    

})


