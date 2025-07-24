import { useParams } from 'react-router-dom'
import { Container, Card, ListGroup, Alert } from 'react-bootstrap'

const User = ({ users }) => {
	const id = useParams().id
	const user = users.find((u) => u.id === id)

	if (users.length === 0) return <div>Loading...</div>

	return (
		<Card className="shadow">
			<Card.Body>
				<Card.Title as="h2" className="mb-4">
					{user.name}
				</Card.Title>
				<Card.Subtitle className="mb-3 text-muted">added blogs</Card.Subtitle>

				{user.blogs.length === 0 ? (
					<Alert variant="info">no blogs added by user</Alert>
				) : (
					<ListGroup variant="flush">
						{user.blogs.map((blog) => (
							<ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Card.Body>
		</Card>
	)
}

export default User
