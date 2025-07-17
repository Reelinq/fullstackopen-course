import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import ExpandBlog from './ExpandBlog'
import Blog from './Blog'
import blogService from '../services/blogs'

describe('<ExpandBlog />', () => {
	const blog = {
		title: 'exampleTitle',
		author: 'exampleAuthor',
		url: 'exampleUrl',
		likes: 2,
		user: {
			name: 'Test user',
			username: 'testuser',
		},
	}

	const mockOnHide = vi.fn()
	const mockSetBlogs = vi.fn()
	vi.mock('../services/blogs')

	test('renders title when not expanded', () => {
		render(
			<ExpandBlog blog={blog}>
				<Blog
					blog={blog}
					onHide={mockOnHide}
					blogs={[]}
					setBlogs={mockSetBlogs}
				/>
			</ExpandBlog>,
		)

		const collapsedSection = screen.getByText('show').closest('span')
		const element = within(collapsedSection).getByText('exampleTitle', {
			exact: false,
		})
		expect(element).toBeInTheDocument()
	})

	test('renders full blog info after clicking show', async () => {
		const user = userEvent.setup()

		render(
			<ExpandBlog blog={blog}>
				<Blog
					blog={blog}
					onHide={mockOnHide}
					blogs={[]}
					setBlogs={mockSetBlogs}
				/>
			</ExpandBlog>,
		)

		const showButton = screen.getByText('show')
		await user.click(showButton)

		expect(screen.getAllByText('exampleTitle exampleAuthor')[1]).toBeVisible()
		expect(screen.getByText('exampleUrl')).toBeInTheDocument()
		expect(screen.getByText('likes 2')).toBeInTheDocument()
		expect(screen.getByText('Test user')).toBeInTheDocument()
	})

	test('calls setBlogs twice when like button is clicked twice', async () => {
		const user = userEvent.setup()
		const mockSetBlogs = vi.fn()

		blogService.updateLikes.mockResolvedValue({
			...blog,
			likes: blog.likes + 1,
		})

		render(
			<ExpandBlog blog={blog}>
				<Blog
					blog={blog}
					onHide={mockOnHide}
					blogs={[blog]}
					setBlogs={mockSetBlogs}
				/>
			</ExpandBlog>,
		)

		const showButton = screen.getByText('show')
		await user.click(showButton)

		const likeButton = screen.getByText('like')
		await user.click(likeButton)
		await user.click(likeButton)

		expect(blogService.updateLikes).toHaveBeenCalledTimes(2)
		expect(mockSetBlogs).toHaveBeenCalledTimes(2)
	})
})
