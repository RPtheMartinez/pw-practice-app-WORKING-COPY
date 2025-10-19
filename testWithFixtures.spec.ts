import { test} from "../test-options"
import {faker} from "@faker-js/faker"

test('Parameterized Methods', async ({ pageManager }) => {
    const randomFullName = faker.person.fullName()
    const randomEMail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    //await pm.navigateTo().formLayoutsPage()
    await pageManager.onFormsLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await pageManager.onFormsLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEMail, false)
})