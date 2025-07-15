import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogsReducer'

const CreateBlog = ({ blogFormRef }) => {
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const createBlog = async (event) => {
		event.preventDefault()
		const newObject = { title, author, url }
		dispatch(addBlog(newObject))
		blogFormRef.current.toggleVisibility()
		setTitle('')
		setAuthor('')
		setUrl('')
		dispatch(setNotification(`a new blog ${title} by ${author} added`))
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
	blogFormRef: PropTypes.object.isRequired
}

export default CreateBlog
