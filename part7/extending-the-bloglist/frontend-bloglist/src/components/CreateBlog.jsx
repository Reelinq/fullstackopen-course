import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogsReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'

const CreateBlog = ({ blogFormRef }) => {
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const createBlog = async (event) => {
		event.preventDefault()
		const newObject = { title, author, url }
		await dispatch(addBlog(newObject))
		dispatch(initializeUsers())
		blogFormRef.current.toggleVisibility()
		setTitle('')
		setAuthor('')
		setUrl('')
		dispatch(setNotification(`a new blog ${title} by ${author} added`))
	}

	return (
		<Card className="p-4 shadow-sm">
			<h3 className="mb-4">Create New Blog</h3>
			<Form onSubmit={createBlog}>
				<Form.Group className="mb-3" controlId="formTitle">
					<Form.Label>title:</Form.Label>
					<Form.Control
						data-testid="title"
						type="text"
						placeholder="Enter blog title"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formAuthor">
					<Form.Label>author:</Form.Label>
					<Form.Control
						data-testid="author"
						type="text"
						placeholder="Enter author"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-4" controlId="formUrl">
					<Form.Label>url:</Form.Label>
					<Form.Control
						data-testid="url"
						type="text"
						placeholder="Enter blog URL"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</Form.Group>
				<Row>
					<Col xs="auto">
						<Button type="submit" variant="secondary">
							<strong>+ Create</strong>
						</Button>
					</Col>
					<Col xs="auto">
						<Button
							variant="outline-secondary"
							onClick={() => blogFormRef.current.toggleVisibility()}
						>
							Cancel
						</Button>
					</Col>
				</Row>
			</Form>
		</Card>
	)
}

CreateBlog.propTypes = {
	blogFormRef: PropTypes.object.isRequired,
}

export default CreateBlog
