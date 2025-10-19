import { test, expect } from "playwright/test"
import { PageManager } from "../page-objects/pageManager"
import {faker} from "@faker-js/faker"

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/")
})

test.skip('Navigate to the Form page', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('Parameterized Methods', async ({ page }) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEMail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormsLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
    await pm.onFormsLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEMail, true)
    //await pm.navigateTo().datepickerPage()
    //await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10)
    //await pm.onDatepickerPage().selectDatePickerWithRangeFromToday(6, 15)
})