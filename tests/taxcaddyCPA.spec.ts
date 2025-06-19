import {test, expect} from '@playwright/test'



test.beforeEach(async ({page}) => {
    await page.goto('https://stage.sureprep.com/Home/Login');
    page.locator('#migrateLaterButton').click();
    await page.locator('#DomainName').fill('TC-Stage-01');
    await page.locator('#UserName').fill('FAHAD');
    await page.locator('#Password').fill('Abcd@12345');
    await page.locator('#btnLogin').click();
    await page.waitForResponse('https://stage.sureprep.com/AccountSetup/InactivityPeriod/sessionTimeoutInMin')

   
   
    
})

test('CPA login', async ({page}) => {
 await page.locator('#poptab').click();
 await page.locator('#isTaxCaddyUser').click();
    
});