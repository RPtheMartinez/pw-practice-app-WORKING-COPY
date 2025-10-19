import { test, expect } from "playwright/test"
import { PageManager } from "../page-objects/pageManager"
import {faker} from "@faker-js/faker"

test.beforeEach(async ({ page }) => {
    await page.goto("/")
})

test('Navigate to the Form page', async ({ page }) => {
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
    await pm.onFormsLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    //This will create a "screenshots" folder (initially) with a screenshot of just the visible part of the page
    await page.screenshot({path: 'screenshots/formsLayoutPage.png'})
    //You can also save a screenshot as a binary file:
    //const buffer = await page.screenshot()
    //console.log(buffer.toString('base64'))
    //Then you can use the binary file in an "expect" statement:
    //expect(buffer).toMatchSnapshot('formsLayoutPage.png')

    await pm.onFormsLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEMail, false)
    await page.locator('nb-card', { hasText: "Inline form" }).screenshot({path: 'screenshots/inlineForm.png'})
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10)
    await pm.onDatepickerPage().selectDatePickerWithRangeFromToday(6, 15)
})