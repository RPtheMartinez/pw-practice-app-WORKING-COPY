import { test, expect } from '@playwright/test'

test('Input Fields', async ({ page }, testInfo) => {
  await page.goto('/')

  if (testInfo.project.name === 'mobile') {
    // Close the sidebar for mobile viewports
    await page.locator('.sidebar-toggle').click()
  }

  await page.locator('.sidebar-toggle').click()
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()

  if (testInfo.project.name === 'mobile') {
    // Close the sidebar for mobile viewports
    await page.locator('.sidebar-toggle').click()
  }
  
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com')
        //await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 100})

        //Generic Assertions
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //Locator Assertions
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
      })