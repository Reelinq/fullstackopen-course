import { strict } from 'assert'

const { expect } = require('@playwright/test')

const postUser = async (request, name, username, password)  => {
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: name,
        username: username,
        password: password
      }
    })
}

const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url)  => {
	await page.getByRole('button', { name: 'create new blog' }).click()
	await page.getByTestId('title').fill(title)
	await page.getByTestId('author').fill(author)
	await page.getByTestId('url').fill(url)
	await expect(async () => {
		await page.getByRole('button', { name: 'create' }).click()
		await expect(page.getByText(`a new blog ${title} by ${author} added`)).toBeVisible()
	}).toPass({ timeout: 100000 })
}

const areBlogsSortedByLikes = async (page) => {
  await page.locator('.blog').first().waitFor({ state: 'visible' })
	const blogs = await page.locator('.blog').all()
  const likeCounts = []

  for (const blog of blogs) {
    const text = await blog.innerText()
    const match = text.match(/likes\s+(\d+)/)
    likeCounts.push(Number(match[1]))
  }

	return likeCounts.every((x, i) => i === 0 || x >= likeCounts[i - 1])
}

export { postUser, loginWith, createBlog, areBlogsSortedByLikes }