import {test, expect} from '@playwright/test'

test.describe.configure({mode: 'parallel'}) //This will run all tests in this file in parallel

//Playwright aut-inswerted this import (below), but it is not used in the code
//import { using } from 'rxjs'

test.beforeEach(async({page}) => {
  await page.goto('/')
})


test.describe('Form Layouts Page', () => {
  test.describe.configure({retries: 2}) //Overrides the global retry setting for this specific describe block

  //This will run all tests in this describe block in "serial," or - one after the other.
  //Howwever, it may take longer to run all tests this way.
  //test.describe.configure({mode: 'serial'})

test.beforeEach( async({page}) => {
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

  
   test('Input Fields', async ({page}) => {
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
            });
        
            //Radio Buttons
            test('Radio Buttons', async ({page}) => {
                const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
                
                //Getting by the radio button label
                //await usingTheGridForm.getByLabel('Option 1').check({force: true})
                
                //Getting by the role and name
                await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})

                const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()
                expect(radioStatus).toBeTruthy()

                await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()
                
                await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
                expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked())
            })
        })


    test('Checkboxes', async ({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()

        await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
        await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})

        const allBoxes = page.getByRole('checkbox')
        for (const box of await allBoxes.all()) {
          await box.uncheck({force: true})
          expect (await box.isChecked()).toBeFalsy()
        }
    })

    test('Lists and Dropdowns', async({page}) => {
    //  await page.getByText('Tables & Data').click()
      const dropDownMenu = page.locator('ngx-header nb-select')
      await dropDownMenu.click()

      page.getByRole('list') //When the list has a UL tag
      page.getByRole('listitem') //When the list item has a LI tag

      // Instead of clicking all lists, target the dropdown options specifically
      /*const optionList = page.locator('nb-option-list nb-option');
      await optionList.first().click(); */ // Click the first item in the dropdown

      //UL tags are used in this app for lists, and LI tags for list items.
      //This means we can use 'list' to interact with the entire list and 'listitem' for individual items.

      //To select a specific item in a list, the code below can be used:
      //const optionList = page.getByRole('list').locator('nb-option')
      //await optionList.nth(1).click() //Clicks the second item in the list (index starts at 0)

      //Another way to select a specific item in a list is to use the text of the item:
      /*const optionList = page.getByRole('list').getByText('Dark')
      await optionList.click()
      await expect (dropDownMenu).toHaveText('Dark') */

      //And another way is to use the value attribute of the item:
      /*await dropDownMenu.click()
      await page.getByRole('list').getByRole('option', {name: 'Cosmic'}).click()
      await expect (dropDownMenu).toHaveText('Cosmic') */

      //And another more compact way to do the same thing:
      //const optionList = page.getByRole('list').locator('nb-option')
      //OR
      //const optionList = page.getByRole('list').locator('nb-option')
      //await expect(optionList).toHaveText(['Dark', 'Cosmic', 'Corporate', 'Light']) //There are 4 items in the list

      //Even better yet:
      const optionList = page.locator('nb-option-list nb-option')
      await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]) //There are 4 items in the list
      await optionList.filter ({hasText: "Cosmic"}).click()

      //To check the value of the dropdown after selection:
      const header = page.locator('nb-layout-header')
      await expect (header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

      const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
      }

      await dropDownMenu.click()
      for (const color in colors) {
        await optionList.filter ({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color != "Corporate")
        await dropDownMenu.click()
      }
    })

    test('tooltips', async({page}) => {
      await page.getByText('Modal & Overlays').click()
      await page.getByText('Tooltip').click()

      const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
      await toolTipCard.getByRole('button', {name: "Top"}).hover()

      page.getByRole('tooltip') //If you have a role 'tooltip' defined in the HTML
      const tooltip = await page.locator('nb-tooltip').textContent()
      expect (tooltip).toEqual('This is a tooltip')
      })

      test('Dialog Boxes', async({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        page.on('dialog', dialog => {
          expect (dialog.message()).toEqual('Are you sure you want to delete?')
          dialog.accept() //or dialog.dismiss()
        })

        await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
        await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
      })

      test('Web Tables', async({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        // Find the table row containing "twitter@outlook.com" and click the edit button in that row
        const targetRow = page.getByRole('row', {name: 'twitter@outlook.com' })
        await targetRow.locator('.nb-edit').click()
        await page.locator('input-editor').getByPlaceholder('Age').clear()
        //await page.locator('input-editor').getByPlaceholder('Age').fill('55')
        await page.locator('.nb-checkmark').click()

        //Now let's select a row based on a value within a specific column.
        await page.locator('.ng2-smart-page-link').getByText('2').click() //Navigate to page 2 of the table
        const targetRowById = page.getByRole('row', {name: "11" }).filter({has: page.locator('td').nth(1).getByText('11')})
        await targetRowById.locator('.nb-edit').click()

        await page.locator('input-editor').getByPlaceholder('E-mail').clear()
        await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
        await page.locator('.nb-checkmark').click()
        await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')

        //Test the filtering functionality of the table.
        const ages = ['20', '30', '40', '200']
        for (let age of ages) {
          await page.locator('input-filter').getByPlaceholder('Age').clear()
          await page.locator('input-filter').getByPlaceholder('Age').fill(age)
          await page.waitForTimeout(500)
          const ageRows = page.locator('tbody tr')

                    for (let row of await ageRows.all()) {
                      const cellValue = await row.locator('td').last().textContent()

                      if (age == '200') {
                      expect(await page.getByRole('table').textContent()).toContain('No data found')
                      } else {
                      expect(cellValue).toEqual(age)
                    }
                    }
              }
            })
      
      test('Datepicker', async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Datepicker').click()

        const calendarInputField = page.getByPlaceholder('Form Picker')
        await calendarInputField.click()

        //Not necessarily the best way to choose a date, but it works for now.
        await page.locator('[class="day-cell ng-star-inserted"]').getByText('30', {exact: true}).click()
        await expect (calendarInputField).toHaveValue('Sep 30, 2025')
      })

      test('Datepicker Advanced', async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Datepicker').click()

        const calendarInputField = page.getByPlaceholder('Form Picker')
        await calendarInputField.click()

        let date = new Date()
        date.setDate(date.getDate() + 7)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
          await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
          calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        }

        //Not necessarily the best way to choose a date, but it works for now.
        await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
        await expect (calendarInputField).toHaveValue(dateToAssert)
      })

      test('Sliders', async({page}) => {

       //Update attribute; this is an easy way to interact with sliders
       //const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
       // await tempGauge.evaluate(node => {
       //   node.setAttribute('cx', '232.630')
       //   node.setAttribute('cy', '232.630')
       // })
       // await tempGauge.click()

        //Mouse movement simulation; this is a more realistic way to interact with sliders
        const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
        await tempBox.scrollIntoViewIfNeeded()

        const box = await tempBox.boundingBox()
        const x = box.x + box.width/2
        const y = box.y + box.height/2

        await page.mouse.move(x, y)
        await page.mouse.down()
        await page.mouse.move(x + 100, y)
        await page.mouse.move(x + 70, y + 30)
        await page.mouse.up()
        await expect(tempBox).toContainText('28') //The value shouldn't contain the celsius symbol.
      })

