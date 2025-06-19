import {test, expect, request} from '@playwright/test';
import tags from '../test-Data/tags.json'


test.beforeEach(async ({page}) =>{
//mock api 
 await page.route('*/**/api/tags', async route => {
    await route.fulfill({
    body: JSON.stringify(tags)
    })
 })

 //intercept and modify api response
 await page.route('*/**/api/articles*', async route =>{
    const response = await route.fetch()
    const responseBody = await response.json()
    responseBody.articles[0].title = "This is a test title"
    responseBody.articles[0].description = "This is a description"

    await route.fulfill({
        body : JSON.stringify(responseBody)
    })

 })

 await page.goto('https://conduit.bondaracademy.com/', {waitUntil: 'networkidle'});

});

test('has title', async ({page}) => {
await expect(page.locator('.navbar-brand')).toHaveText('conduit');
//validate the response from api is showing up on the UI of the web which was intercepted
await expect(page.locator('app-article-preview h1').first()).toContainText('This is a test title');
await expect(page.locator('app-article-preview p').first()).toContainText('This is a description')
// taxcaddy : user1.tp85142@mailinator.com
});

test('Taxpayer consumer login and send a message', async ({page, request}) => { 
    const response = await request.post('https://stage.taxcaddy.com/api/v1/Token', {
    form: {
        username:'user1.tp85142@mailinator.com',
        password:'Abcd@12345',
        grant_type:'password',
      }

    })
    const responseBody = await response.json();
    const token = responseBody.access_token;
    const userId = responseBody.userId; 

   
    const response2 = await request.post('https://stage.taxcaddy.com/api/v1/users/${userId}/messages', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },    
        data: {
            subject: "hello again again", description: "tdsfasdafsdhis is a new message", taxYear: 2025, userId: 7950221
        },
     
    });


    
    
});
