import {test, expect} from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker';


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/');
})

test('navigate to form page', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datepickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();
})

test('parameterized methods', async({page}) => {
    const pm = new PageManager(page);
    const randomFullnName = faker.person.fullName();
    const randomeEmail = `${randomFullnName.replace(' ','')}${faker.number.int(1000)}@test.com`;


    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('testid@gmail.com','Welcome123','Option 2');
    await page.screenshot({path: 'screenshots/form-layouts.png'});
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullnName,randomeEmail, true);
    await pm.navigateTo().datepickerPage();
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10);
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15);

})

































































































