import {Page, expect} from "@playwright/test"
import { NavigationPage } from "./navigationPage"
import { FormLayoutsPage } from "./formLayoutsPage"
import { DatepickerPage } from "./datepickerPage"

export class PageManager {
    private readonly page: Page

    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datepickerPage: DatepickerPage
    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
    }

    //Return the page objects
    navigateTo() {
        return this.navigationPage
    }

    onFormsLayoutPage() {
        return this.formLayoutsPage
    }

    onDatepickerPage() {
        return this.datepickerPage
    } 
}