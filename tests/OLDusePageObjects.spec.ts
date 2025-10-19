import { test, expect } from "playwright/test"
import { NavigationPage } from "../page-objects/navigationPage"
import { FormLayoutsPage } from "../page-objects/formLayoutsPage"
import { DatepickerPage } from "../page-objects/datepickerPage"

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/")
})

test('Navigate to the Form page', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('Parameterized Methods', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)
    const onDatepickerPage = new DatepickerPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('Dude McDude', 'dude.mcdude@example.com', true)
    await navigateTo.datepickerPage()
    await onDatepickerPage.selectCommonDatePickerDateFromToday(10)
    await onDatepickerPage.selectDatePickerWithRangeFromToday(6, 15)
})