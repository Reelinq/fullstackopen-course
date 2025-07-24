import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { likeBlog, removeBlog, addComment } from '../reducers/blogsReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { Card, Button, Form, ListGroup, Row, Col, Badge } from 'react-bootstrap'

const Blog = ({ user }) => {
	const id = useParams().id
	const blog = useSelector((state) => state.blogs.find((b) => b.id === id))

	const [commentContent, setCommentContent] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleLike = () => {
		dispatch(likeBlog(blog))
	}
	const handleRemove = async () => {
		navigate('/')
		await dispatch(removeBlog(blog))
		dispatch(initializeUsers())
	}

	const handleAddComment = async (event) => {
		event.preventDefault()
		await dispatch(addComment(blog.id, commentContent))
		setCommentContent('')
	}

	if (!blog) return <div>Loading...</div>

	const isCreator = blog.user && blog.user.id === user.id

	return (
		<Card className="my-4 shadow">
			<Card.Body>
				<Card.Title as="h2" style={{ display: 'flex', alignItems: 'center' }}>
					{blog.title}
					<Badge
						bg="light"
						text="dark"
						className="px-3 py-2 rounded-pill border"
						style={{
							fontSize: '0.85rem',
							fontWeight: '500',
							marginLeft: '5px',
						}}
					>
						{blog.author}
					</Badge>
				</Card.Title>

				<Card.Text>
					<strong>URL: </strong>
					<a href={blog.url} target="_blank" rel="noopener noreferrer">
						{blog.url}
					</a>
				</Card.Text>

				<Card.Text>
					<strong>likes:</strong> {blog.likes}{' '}
					<Button variant="outline-primary" size="sm" onClick={handleLike}>
						like
					</Button>
				</Card.Text>

				<Card.Text>
					<small className="text-muted">
						added by <strong>{blog.user?.name || 'unknown'}</strong>
					</small>
				</Card.Text>

				{isCreator && (
					<Button
						variant="outline-danger"
						size="sm"
						className="mb-3"
						onClick={handleRemove}
					>
						remove
					</Button>
				)}

				<hr />

				<h4>comments</h4>

				<Form onSubmit={handleAddComment} className="mb-3">
					<Row>
						<Col sm={9}>
							<Form.Control
								type="text"
								placeholder="Add a comment..."
								value={commentContent}
								onChange={({ target }) => setCommentContent(target.value)}
							/>
						</Col>
						<Col sm="auto">
							<Button type="submit" variant="secondary">
								add comment
							</Button>
						</Col>
					</Row>
				</Form>

				{blog.comments.length > 0 ? (
					<ListGroup variant="flush">
						{blog.comments.map((comment) => (
							<ListGroup.Item key={comment.id}>
								{comment.content}
							</ListGroup.Item>
						))}
					</ListGroup>
				) : (
					<p className="text-muted">no comments</p>
				)}
			</Card.Body>
		</Card>
	)
}

export default Blog
