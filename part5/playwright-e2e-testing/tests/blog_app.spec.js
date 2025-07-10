const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
			await page.getByTestId('username').fill('mluukkai')
			await page.getByTestId('password').fill('salainen')
		
			await page.getByRole('button', { name: 'login' }).click() 
		
			await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
		})

    test('fails with wrong credentials', async ({ page }) => {
			await page.getByTestId('username').fill('mluukkai')
			await page.getByTestId('password').fill('wrong')
		
			await page.getByRole('button', { name: 'login' }).click() 
		
			await expect(page.getByText('wrong username or password')).toBeVisible()
		})
  })

	describe('When logged in', () => {
		beforeEach(async ({ page }) => {
			await page.getByTestId('username').fill('mluukkai')
			await page.getByTestId('password').fill('salainen')
			
			await page.getByRole('button', { name: 'login' }).click() 
		})

		test.only('a new blog can be created', async ({ page }) => {
			await page.getByRole('button', { name: 'create new blog' }).click()

			await page.getByTestId('title').fill('testTitle')
			await page.getByTestId('author').fill('testAuthor')
			await page.getByTestId('url').fill('testUrl')

			await page.getByRole('button', { name: 'create' }).click()

			await expect(page.getByText('a new blog testTitle by testAuthor added')).toBeVisible()
		})
	})
})