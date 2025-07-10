import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'exampleTitle',
    author: 'exampleAuthor',
    url: 'exampleUrl',
    likes: 'exampleLikes'
  }

  const mockOnHide = vi.fn()
  const mockSetBlogs = vi.fn()

  render(<Blog blog={blog} onHide={mockOnHide} blogs={[]} setBlogs={mockSetBlogs} />)

  const element = screen.getByText((content) =>
    content.includes('exampleTitle')
    )
  expect(element).toBeDefined()
})