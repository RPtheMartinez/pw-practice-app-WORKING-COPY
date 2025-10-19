
import { test, expect } from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
  await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000) // This is set for 2 seconds more than the default timeout for this test.
})

test('Autowaiting Test Example 1', async ({page}) => {
  const successButton = page.locator('bg-success')
  
  // Playwright automatically waits for the element to be ready, so this line is not necessary.
  // await successButton.click() 

  // const test = await successButton.textContent()
  //await successButton.waitFor(state: "attached") // Not necessary because of autowaiting
  //const test = await successButton.allTextContents()

  //expect(test).toContain("Data loaded with AJAX get request.")

  await expect(successButton).toHaveText("Data loaded with AJAX get request."), {timeout: 50000}

})

test('Alternative Waits Test Examples', async ({page}) => {
  const successButton = page.locator('bg-success')
  
  //Wait for element/button to be visible
  //await page.waitForSelector('.bg-success', {state: 'visible'})

  //Wait for a particular response from the server
  //await page.waitForResponse('http://uitestingplayground.com/ajax')

  //Wait for network calls to be completed. NOT RECOMMENDED.
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()   
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('Timeouts', async ({page}) => {
    //test.setTimeout(10000) //This is set for 10 seconds. This is the maximum time this test can run. If the test takes longer than this time, it will be terminated and marked as failed.
    
    test.slow() //This is used to mark a test as slow. This is useful for tests that are expected to take a long time to complete. When a test is marked as slow, Playwright will automatically increase the timeout for the test.
    
    const successButton = page.locator('bg-success')
    await successButton.click()

})

