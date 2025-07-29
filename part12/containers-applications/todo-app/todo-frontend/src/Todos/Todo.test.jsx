import { render, screen } from '@testing-library/react'
import { beforeEach, describe, it, expect, vi } from 'vitest'
import Todo from './Todo'

describe('Todo Component', () => {
	const mockTodo = {
		_id: '1',
		text: 'Test todo',
		done: false
	}

	const mockOnDelete = vi.fn()
	const mockOnUpdate = vi.fn()

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders todo text correctly', () => {
		render(
			<Todo
				todo={mockTodo}
				onDelete={mockOnDelete}
				onUpdate={mockOnUpdate}
			/>
		)

		expect(screen.getByText('Test todo')).toBeInTheDocument()
	})
})