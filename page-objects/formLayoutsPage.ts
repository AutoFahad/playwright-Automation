import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helperBase';
import { Browser } from 'leaflet';


export class FormLayoutsPage extends HelperBase {
    //readonly page: Page;
    
    constructor(page: Page) {
    super(page);
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"});
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email);
        await usingTheGridForm.getByLabel('Password').fill(password);
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true});
        await usingTheGridForm.getByRole('button').click();

    }
  
   /**
    * This method will fill out the inline form with name, email and checkbox
    * @param name - should be first and last name
    * @param email - valid email address
    * @param rememberMe - true or false if user session should be remembered
    */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
        const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"});
        await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name);
        await inlineForm.getByRole('textbox', {name: "Email"}).fill(email);
        if(rememberMe) 
            await inlineForm.getByRole('checkbox').check({force: true});       
            await inlineForm.getByRole('button').click();
            await this.waitForNumberOfSeconds(5);
            
    }

}