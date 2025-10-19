import { test, expect } from '@playwright/test'
import * as tags from '../test-data/tags.json'

test.beforeEach(async ({ page }) => {

  await page.route('*/**/api/tags', async route => {
  await route.fulfill({
    body: JSON.stringify(tags)
  })
})

  await page.route('*/**/api/articles*', async route => {
  const response = await route.fetch()
  const responseBody = await response.json()
  responseBody.articles[0].title = 'This is a mocked article title'
  responseBody.articles[0].description = 'This is a mocked article description'

await route.fulfill({,
    body: JSON.stringify(responseBody)
  })
})

  await page.goto('https://angular.realworld.io')
})


test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page.locator('.navbar-brand')).toHaveText('conduit')
  await expect(page.locator('app-article-list h1')).first().toContainText('This is a mocked article title')
  await expect(page.locator('app-article-list p')).first().toContainText('This is a mocked article description')
})