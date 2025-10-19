import { Locator, Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class FormLayoutsPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    /**
     * This method will output the "Using the Grid" form with the User's credentials and selected option.
     * @param email - should be a valid email address
     * @param password - should be a valid password
     * @param optionText - should be the text of the selected option
     */
    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: "Using the Grid" })
        await usingTheGridForm.getByRole('textbox', {name: "Email" }).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password" }).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }
    
    /**
     * This method will output the inline form with the User's details.
     * @param name - should be first and last name
     * @param email - should be a valid email address
     * @param rememberMe - whether the user wants to be remembered/save their session.
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: "Inline form" })
        await inlineForm.getByRole('textbox', {name: "Jane Doe" }).fill(name)
        await inlineForm.getByRole('textbox', {name: "Email" }).fill(email)

        if (rememberMe)
            await inlineForm.getByRole('checkbox').check({force: true})
        await inlineForm.getByRole('button').click()
    }
}