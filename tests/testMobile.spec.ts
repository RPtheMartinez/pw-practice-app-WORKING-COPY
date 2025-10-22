import {test, expect} from ‘@playwright/test’

test('Input Fields', async ({page}) => {
	await page.goto('/')
	await page.getByText('Forms').click()
	await page.getByTest('Form Layouts').click()
  
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