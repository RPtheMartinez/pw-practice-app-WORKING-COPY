//NOTES:
//YOU MAY FIRST NEED TO RUN 'npx ng serve' IN TERMINAL TO START THE ANGULAR APP
//YOU MAY NEED TO FIRST RUN 'npx playwright install' IN TERMINAL TO INSTALL BROWSERS
//YOU WILL ALSO NEED TO RUN 'npx playwright test' IN TERMINAL TO RUN THE TESTS
//YOU CAN ALSO OPEN THE PLAYWRIGHT TEST RUNNER UI WITH 'npx playwright test --ui' IN TERMINAL


import { test, expect } from '@playwright/test'

test.beforeEach(async({page}) => {
  await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})


test('Locator Syntax Rules', async ({page}) => {
//Find Locator by Tag Name
await page.locator('input').first().click
//Find Locator by ID
page.locator('#inputEmail')
//Find Locator by Class Value
page.locator('.shape-rectangle')
//Find Locator by Attribute
page.locator('[placeholder="Email"]')
//Find Locator by FULL Class Value
page.locator('[class="input-full-width size-medium status-basic form-control shape-rectangle nb-transition"]')

//Combine different Locator selections
page.locator('input[placeholder="Email"][nbinput]')

//Find Locator by XPath (NOT RECOMMENDED)
page.locator('//input[@id="inputEmail1"]')

//Find by Partial Text match
page.locator(':text("Using")')
//Find by Exact Text match
page.locator(':text-is("Using the Grid")')

})

test('User Facing locators', async ({page}) => {
  //Test steps go here
  await page.getByRole('textbox', { name: "Email" }).first().click()
  
  await page.getByRole('button', { name: "Sign In" }).first().click()
  
  await page.getByLabel('Email').first().click()
  
  await page.getByPlaceholder('Jane Doe').click()
  
  await page.getByText('Using the Grid').click()
  
  //A Test ID is a custom attribute that is added to an HTML element specifically for testing purposes.
  //Test IDs are not visible to users and do not affect the functionality of the application.
  //They are used to make it easier to locate elements in automated tests.
 // await page.getByTestId('Sign In').click()
  
  await page.getByTitle('IoT Dashboard').click()

})

test('Locating Child Elements', async ({page}) => {
  //Test steps go here
  await page.locator('nb-card nb-radio').getByText('Option 1').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

  await page.locator('nb-card').getByRole('button', { name: "Sign In" }).first().click()

//The least desireable approach to locating elements is to use nth() to select an element based on its index in a list of matching elements.
//THIS APPROACH IS BRITTLE AND CAN EASILY BREAK IF THE ORDER OF THE ELEMENTS ON THE PAGE CHANGES.
 // await page.locator('nb-card').nth(3).getByRole('button', { name: "Sign In" }).click()
})

test('Locating Parent Elements', async({page}) => {
  //Test steps go here
//await page.locator('nb-card', {hasText:"Using the Grid"}).getByRole('textbox', { name: "Email" }).click()
//await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', { name: "Email" }).click()

//await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('button', { name: "Sign In" }).click()

//await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign In" }).getByRole('textbox', {name: "Email"}).click()

//Another way - although not always recommended - is to locate parent elements by going "one level up" 

//await page. locator(':text-is("Using the Grid")').locator(' .. ').getByRole('textbox', {name: "Email"}). click()

})

test('Reusing the Locators', async({page}) => {
  const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
  const emailField = basicForm.getByRole('textbox', { name: "Email" })

  await emailField.fill('test@test.com')
  await basicForm.getByRole('textbox', { name: "Password" }).fill('Welcome123')
  await basicForm.locator('nb-checkbox').click()
  await basicForm.getByRole('button').click()

  await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting Values from the UI', async({page}) => {
//Single test value extraction
  const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
  const buttonText = await basicForm.locator('button').textContent()
expect(buttonText).toEqual('Submit')

//All test values
const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
expect(allRadioButtonsLabels).toContain("Option 1")

//Input values
const emailField = basicForm.getByRole('textbox', { name: "Email" })
await emailField.fill('test@test.com')
const emailFieldValue = await emailField.inputValue()
expect(emailFieldValue).toEqual('test@test.com')

const placeHoldereValue = await emailField.getAttribute('placeholder')
expect(placeHoldereValue).toEqual('Email')

})

test('Assertions', async({page}) => {
const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

//General assertions
const value = 5
expect(value).toEqual(5)

const text = await basicFormButton.textContent()
expect(text).toEqual("Submit")

//Locator assertion
await expect(basicFormButton).toHaveText('Submit')

//Soft Assertion
await expect.soft(basicFormButton).toHaveText('Submit')
await basicFormButton.click()

})
