//This might not be the most efficient way to handle navigation, but it works for now.
//The approach here can be simplified by using a single method that takes the menu item as a parameter.
//This would reduce redundancy and make the code cleaner.

//Sometimes it's good to keep locators inside of the page object class, sometimes it's better to keep them in the test file.
//It depends on the specific use case and the complexity of the locators.
//In this case, since the locators are simple and used only in one place, it's fine to keep them in the page object class.

import { Locator, Page } from "@playwright/test"

export class NavigationPage {

    readonly page: Page
    readonly formLayoutsMenuItem: Locator
    readonly datepickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page) {
        this.page = page
        this.formLayoutsMenuItem = page.getByText('Form Layouts')
        this.datepickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem = page.getByText('Smart Table')
        this.toastrMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip')
    }
    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutsMenuItem.click()
    }

    async datepickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)
        await this.datepickerMenuItem
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.waitForTimeout(1000)
        await this.smartTableMenuItem.click()
    }

    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.waitForTimeout(1000)
        await this.toastrMenuItem.click()
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.waitForTimeout(1000)
        await this.tooltipMenuItem.click()
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')

        if (expandedState === 'false')
            await groupMenuItem.click()
        }

    }
