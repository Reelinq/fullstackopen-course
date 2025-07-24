import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import CreateBlog from './CreateBlog'
import blogService from '../services/blogs'

describe('<CreateBlog />', () => {
	vi.mock('../services/blogs')
	const mockAddBlog = vi.fn()
	const setMessage = vi.fn()
	const blogFormRef = {
		current: {
			toggleVisibility: vi.fn(),
		},
	}

	test('addBlog with correct details happens when new blog is created', async () => {
		blogService.create.mockResolvedValue({
			title: 'exampleTitle',
			author: 'exampleAuthor',
			url: 'exampleUrl',
		})

		const user = userEvent.setup()
		render(
			<CreateBlog
				addBlog={mockAddBlog}
				setMessage={setMessage}
				blogFormRef={blogFormRef}
			/>,
		)

		const inputs = screen.getAllByRole('textbox')
		await user.type(inputs[0], 'exampleTitle')
		await user.type(inputs[1], 'exampleAuthor')
		await user.type(inputs[2], 'exampleUrl')

		const createButton = screen.getByText('create')
		await user.click(createButton)

		expect(mockAddBlog.mock.calls).toHaveLength(1)
		expect(mockAddBlog).toHaveBeenCalledWith(
			expect.objectContaining({
				title: 'exampleTitle',
				author: 'exampleAuthor',
				url: 'exampleUrl',
			}),
		)
	})
})
