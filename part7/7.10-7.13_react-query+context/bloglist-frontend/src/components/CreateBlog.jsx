import { useState, useContext } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import NotificationContext from '../notificationContext'
import { setNotification } from '../notificationHelper'

const CreateBlog = ({ addBlog, blogFormRef }) => {
	const [notification, dispatch] = useContext(NotificationContext)

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const createBlog = async (event) => {
		event.preventDefault()
		const newObject = { title, author, url }
		const createdBlog = await blogService.create(newObject)
		addBlog(createdBlog)
		blogFormRef.current.toggleVisibility()
		setTitle('')
		setAuthor('')
		setUrl('')
		setNotification(dispatch, `a new blog ${title} by ${author} added`)
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={createBlog}>
				<div>
					title:
					<input
						data-testid='title'
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						data-testid='author'
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url
					<input
						data-testid='url'
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
	addBlog: PropTypes.func.isRequired,
	blogFormRef: PropTypes.object.isRequired
}

export default CreateBlog