import { useState, useContext } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from '../contexts/notificationContext'
import { setNotification } from '../helpers/notificationHelper'

const CreateBlog = ({ blogFormRef }) => {
	const [notification, dispatch] = useContext(NotificationContext)
	const queryClient = useQueryClient()

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const createBlogMutation = useMutation({
		mutationFn: blogService.create,
		onSuccess: (newBlog) => {
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
			blogFormRef.current.toggleVisibility()
			setTitle('')
			setAuthor('')
			setUrl('')
			setNotification(
				dispatch,
				`a new blog ${newBlog.title} by ${newBlog.author} added`,
			)
		},
		onError: (error) => {
			setNotification(dispatch, `Error creating blog: ${error.message}`)
		},
	})

	const createBlog = async (event) => {
		event.preventDefault()
		const newObject = { title, author, url }
		createBlogMutation.mutate(newObject)
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={createBlog}>
				<div>
					title:
					<input
						data-testid="title"
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						data-testid="author"
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url
					<input
						data-testid="url"
						type="text"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

CreateBlog.propTypes = {
	blogFormRef: PropTypes.object.isRequired,
}

export default CreateBlog
