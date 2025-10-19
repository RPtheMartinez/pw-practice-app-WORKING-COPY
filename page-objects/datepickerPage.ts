import { Locator, Page, expect } from "@playwright/test" 
import { HelperBase } from "./helperBase"

export class DatepickerPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    /**
     * This method will select a date from the Common Datepicker, based on the number of days from today.
     * @param numberOfDaysFromToday - number of days from today to select the date.
     */
    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDateInThatCalendar(numberOfDaysFromToday)
        await expect (calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const dateToAssertStart = await this.selectDateInThatCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInThatCalendar(endDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect (calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInThatCalendar(numberOfDaysFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
        
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
            while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
                await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
                calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
                }
        
                //Fix for strict mode violation - use first() to select the first matching element
                await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).first().click()
                return dateToAssert
    }

}