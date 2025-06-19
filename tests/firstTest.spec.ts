import {test, expect} from '@playwright/test'



test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})

test('Locator syntax rules', async ({page}) => {
    // by tag name
    await page.locator('input').first().click();
    // by ID
    page.locator('#inputEmail1');
    // by class name
    page.locator('.shape-rectangle');
    // by attribute
    page.locator('[placeholder="Email"]');
    // by full Class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');
    // combination of different locators
    page.locator('input[placeholder="Email"].shape-rectangle');
    // by Xpath (not recommended)
    page.locator('//input[@placeholder="Email"]');
    // by partial text match
    page.locator(':test("Using")');
    // by exact text match
    page.locator(':text("Using the Grid")');
})

test('User facing locators', async ({page}) => {
await page.getByRole('textbox', {name: 'Email'}).first().click();
await page.getByRole('button', {name: 'Sign in'}).first().click();
await page.getByLabel('Email').first().click();
await page.getByPlaceholder('Jane Doe').click();
await page.getByText('Using the Grid').click();
//await page.getByTitle('IoT Dashboard').click();
await page.getByTestId('SignIn').click();
})

test('locating child elements', async ({page}) => {
//each locator is a child of the previous one. Seperated by space
await page.locator('nb-card nb-radio :text-is("Option 1")').click(); 
await page.locator('nb-card').locator('nb-radio').locator(':text("Option 2")').click();
await page.locator('nb-card').nth(3).getByRole('button', {name: 'Submit'}).click();
})

test('locating parent elements', async ({page}) => {
//each locator is a parent of the previous one. Seperated by >  
await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click();
await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click();
await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click();
await page.locator('nb-card').filter({has: page.locator('#exampleInputEmail1')}).getByRole('textbox', {name: "Email"}).click();
await page.locator('nb-card').filter({has: page.locator('#exampleInputEmail1')}).getByRole('textbox', {name: "Password"}).click();
await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click();
// this is the same as above but using the locator method xpath .. rarely used but can be useful
await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click();   
})

test('Reusing locators', async ({page}) => {
// Reusing locators is a good practice to avoid repeating the same locator multiple times
const basicFormCard = page.locator('nb-card').filter({hasText: "Basic form"});
const emailField = basicFormCard.getByRole('textbox', {name: "Email"})
await emailField.fill('test@test.com');
await basicFormCard.getByRole('textbox', {name: "Password"}).fill('Welcome123');
await basicFormCard.locator('nb-checkbox').click();
await basicFormCard.getByRole('button').click();
await expect(emailField).toHaveValue('test@test.com');
})

test('Extracting Values', async ({page}) => {
// Extracting values from elements
const basicFormCard = page.locator('nb-card').filter({hasText: "Basic form"});
const buttonText = await basicFormCard.getByRole('button').textContent();
expect(buttonText).toEqual('Submit');
//all text values
const allRadioButtonLabels = await page.locator('nb-radio').allTextContents();
expect(allRadioButtonLabels).toContain("Option 1");
//input field values
const emailField =  basicFormCard.getByRole('textbox', {name: "Email"});
await emailField.fill('test@test.com');
const emailValue = await emailField.inputValue();
expect(emailValue).toEqual('test@test.com')
//get value of attribute
const attributeValue = await emailField.getAttribute('placeholder');
expect(attributeValue).toEqual('Email');
})

test('Assertions', async ({page}) => {  
const basicFormCard = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');
//Assertions are used to verify that the expected result is equal to the actual result
//general assertions
const value = 5
expect(value).toBe(5);
const text = await basicFormCard.textContent();
expect(text).toEqual('Submit');
// locator assertions
expect(basicFormCard).toHaveText('Submit');
// soft assertions
await expect(basicFormCard).toHaveText('Submit');
await basicFormCard.click();
})


test('waiting for elements', async ({page}) => {
// waiting for elements to be visible


})