import {expect} from "playwright/test";
import {test} from '../test-options'

test('Drag and Drop with iFrame', async({page, globalsQaURL}) => {
    await page.goto(globalsQaURL)

    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frame.locator('li', {hasText: "High Tatras 2"}).click()
    await frame.locator('li', {hasText: "High Tatras 2"}).dragTo(frame.locator('#trash'))

    //More precise control.
    await frame.locator('li', {hasText: "High Tatras 3"}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()
    //await expect(frame.locator('#trash li')).toHaveCount(2) //Just a way to confirm the drop worked.
    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 3"])
})
