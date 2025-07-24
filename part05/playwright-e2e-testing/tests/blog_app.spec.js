const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
		await helper.postUser(request, 'Matti Luukkainen', 'mluukkai', 'salainen')

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
			await helper.loginWith(page, 'mluukkai', 'salainen')
			await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
		})

    test('fails with wrong credentials', async ({ page }) => {
			await helper.loginWith(page, 'mluukkai', 'wrong')
			await expect(page.getByText('wrong username or password')).toBeVisible()
		})
  })

	describe('When logged in', () => {
		beforeEach(async ({ page }) => {
			await helper.loginWith(page, 'mluukkai', 'salainen')
			await helper.createBlog(page, 'testTitle', 'testAuthor', 'testUrl')
		})

		test('a new blog can be created', async ({ page }) => {
			await helper.createBlog(page, 'testTitle1', 'testAuthor1', 'testUrl1')
			await expect(page.getByText('a new blog testTitle1 by testAuthor1 added')).toBeVisible()
		})

		test('a blog can be liked', async ({ page }) => {
			await expect(page.locator('span').filter({ hasText: 'testTitle testAuthorshow' }).locator('span')).toBeVisible()

			const showButtons = await page.getByRole('button', { name: 'show' }).all()
    	await showButtons[0].click()

			await expect(page.getByText('likes 0')).toBeVisible()
			await page.getByRole('button', { name: 'like' }).click()
			await expect(page.getByText('likes 1')).toBeVisible()
		})

		test('a blog can be deleted by creator', async ({ page }) => {
			page.once('dialog', async (dialog) => await dialog.accept())

			await helper.createBlog(page, 'testTitle1', 'testAuthor1', 'testUrl1')
			await expect(page.getByText('a new blog testTitle1 by testAuthor1 added')).toBeVisible()

			await expect(page.locator('span').filter({ hasText: 'testTitle1 testAuthor1show' }).locator('span')).toBeVisible()

			const showButtons = await page.getByRole('button', { name: 'show' }).all()
			await showButtons[showButtons.length - 1].click()

			await page.getByRole('button', { name: 'remove' }).click()

			await expect(page.getByText('testTitle1 testAuthor1show')).not.toBeVisible()
		})

		test('a blog can be deleted ONLY by creator', async ({ page, request }) => {
			await helper.postUser(request, 'Fake Luukkainen', 'mluufake', 'fakeinen')

			await helper.createBlog(page, 'testTitle1', 'testAuthor1', 'testUrl1')
			await expect(page.getByText('a new blog testTitle1 by testAuthor1 added')).toBeVisible()

			await expect(page.locator('span').filter({ hasText: 'testTitle1 testAuthor1show' }).locator('span')).toBeVisible()

			const showButtons = await page.getByRole('button', { name: 'show' }).all()
			await showButtons[showButtons.length - 1].click()
			await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

			await page.getByRole('button', { name: 'logout' }).click()

			//loging with a new user

			await expect(page.getByText('Log in to application')).toBeVisible()
			await helper.loginWith(page, 'mluufake', 'fakeinen')
			
			await expect(page.locator('span').filter({ hasText: 'testTitle1 testAuthor1show' }).locator('span')).toBeVisible()

			const showButtons2 = await page.getByRole('button', { name: 'show' }).all()
			await showButtons2[showButtons2.length - 1].click()
			await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
		})

		test('name of test', async ({ page }) => {
			test.setTimeout(100000)
			const blogs = []

			for (let i = 1; i <= 9; i++) {
				const title = `testTitle${i}`
				const author = `testAuthor${i}`
				const url = `testUrl${i}`
				await helper.createBlog(page, title, author, url)
				await expect(page.getByText(`testTitle${i} testAuthor${i}show`)).toBeVisible() //this fails

				const lastShowButton = page.getByRole('button', { name: 'show' }).last()
				await lastShowButton.click()

				blogs.push({ title, author })
			}

			//open the last one blog as well
			await page.getByRole('button', { name: 'show' }).click()

			await expect(helper.areBlogsSortedByLikes(page)).toBeTruthy()

			for (const { title, author } of blogs) {
				const blogLocator = page.locator('.blog', { hasText: `${title} ${author}` })
 				const likeButton = blogLocator.getByRole('button', { name: 'like' })
				await expect(likeButton).toBeVisible()

				let text = await blogLocator.innerText()
				let match = text.match(/likes\s+(\d+)/)
				let currentLikesNum = match ? Number(match[1]) : 0

				const likeTimes = Math.floor(Math.random() * 10) + 1
				console.log(likeTimes)
				for (let i = 0; i < likeTimes; i++) {
					await likeButton.click()
					await expect(blogLocator).toHaveText(new RegExp(`likes\\s+${currentLikesNum + 1}`))
					currentLikesNum++
				}
			}

			await expect(helper.areBlogsSortedByLikes(page)).toBeTruthy()
		})
	})
})