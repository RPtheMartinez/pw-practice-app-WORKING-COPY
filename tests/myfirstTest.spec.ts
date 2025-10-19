//Last saved on 9/3/2025 12:53 PM

import { test } from '@playwright/test'

test('The first test', async ({page}) => {
await page.goto('/')
await page.getByText('Forms').click()
await page.getByText('Form Layouts').click()
await page.pause()
})

test('Navigate/click to the Datepicker page', async ({page}) => {
await page.goto('/')
await page.getByText('Forms').click()
await page.getByText('Datepicker').click()
await page.pause()
})
