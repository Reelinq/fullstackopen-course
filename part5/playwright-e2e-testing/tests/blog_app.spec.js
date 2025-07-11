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
		beforeEach(async ({ page, request }) => {
			await expect(page.getByText('Log in to application')).toBeVisible()
			const loginResponse = await request.post('http://localhost:3003/api/login', {
				data: {
					username: 'mluukkai',
					password: 'salainen'
				}
			})

			const body = await loginResponse.json()
			const token = body.token

			await request.post('http://localhost:3003/api/blogs', {
				data: {
					title: 'testBlog',
					author: 'testAuthor',
					url: 'testUrl'
				},
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			await page.goto('http://localhost:5173') //reload the page so newly added blog would appear :)

			await page.getByTestId('username').fill('mluukkai')
			await page.getByTestId('password').fill('salainen')
			
			await page.getByRole('button', { name: 'login' }).click() 
		})

		test('a new blog can be created', async ({ page }) => {
			await page.getByRole('button', { name: 'create new blog' }).click()

			await page.getByTestId('title').fill('testTitle')
			await page.getByTestId('author').fill('testAuthor')
			await page.getByTestId('url').fill('testUrl')

			await page.getByRole('button', { name: 'create' }).click()

			await expect(page.getByText('a new blog testTitle by testAuthor added')).toBeVisible()
		})

		test('a blog can be liked', async ({ page }) => {
			await expect(page.locator('span').filter({ hasText: 'testBlog testAuthorshow' }).locator('span')).toBeVisible()

			const showButtons = await page.getByRole('button', { name: 'show' }).all()

    	await showButtons[0].click()

			await expect(page.getByText('likes 0')).toBeVisible()
			
			await page.getByRole('button', { name: 'like' }).click()

			await expect(page.getByText('likes 1')).toBeVisible()
		})
		test('a blog can be deleted by creator', async ({ page }) => {
			page.once('dialog', async (dialog) => await dialog.accept())

			await page.getByRole('button', { name: 'create new blog' }).click()

			await page.getByTestId('title').fill('testTitle1')
			await page.getByTestId('author').fill('testAuthor1')
			await page.getByTestId('url').fill('testUrl1')

			await page.getByRole('button', { name: 'create' }).click()

			await expect(page.getByText('a new blog testTitle1 by testAuthor1 added')).toBeVisible()

			await expect(page.locator('span').filter({ hasText: 'testTitle1 testAuthor1show' }).locator('span')).toBeVisible()

			const showButtons = await page.getByRole('button', { name: 'show' }).all()
			await showButtons[showButtons.length - 1].click()

			await page.getByRole('button', { name: 'remove' }).click()

			await expect(page.getByText('testTitle1 testAuthor1show')).not.toBeVisible()
		})
		test('a blog can be deleted ONLY by creator', async ({ page, request }) => {
			await request.post('http://localhost:3003/api/users', {
				data: {
					name: 'Fake Luukkainen',
					username: 'mluufake',
					password: 'fakeinen'
				}
			})

			page.once('dialog', async (dialog) => await dialog.accept())

			await page.getByRole('button', { name: 'create new blog' }).click()

			await page.getByTestId('title').fill('testTitle1')
			await page.getByTestId('author').fill('testAuthor1')
			await page.getByTestId('url').fill('testUrl1')

			const createButton = await page.getByRole('button', { name: 'create' })
			await expect(createButton).toBeEnabled()
			await createButton.click()

			await expect(page.getByText('a new blog testTitle1 by testAuthor1 added')).toBeVisible()

			await expect(page.locator('span').filter({ hasText: 'testTitle1 testAuthor1show' }).locator('span')).toBeVisible()

			const showButtons1 = await page.getByRole('button', { name: 'show' }).all()
			await showButtons1[showButtons1.length - 1].click()

			await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

			//logouting

			await page.getByRole('button', { name: 'logout' }).click()

			await expect(page.getByText('Log in to application')).toBeVisible()

			await request.post('http://localhost:3003/api/login', {
				data: {
					username: 'mluufake',
					password: 'fakeinen'
				}
			})

			await page.getByTestId('username').fill('mluufake')
			await expect(page.getByTestId('username')).toHaveValue('mluufake')
			await page.getByTestId('password').fill('fakeinen')
			await expect(page.getByTestId('password')).toHaveValue('fakeinen')
			
			const loginButton = await page.getByRole('button', { name: 'login' })
			await expect(loginButton).toBeEnabled()
			await loginButton.click()

			await page.pause()
			await expect(page.locator('span').filter({ hasText: 'testTitle1 testAuthor1show' }).locator('span')).toBeVisible()

			const showButtons2 = await page.getByRole('button', { name: 'show' }).all()
			await showButtons2[showButtons2.length - 1].click()

			await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
		})
	})
})