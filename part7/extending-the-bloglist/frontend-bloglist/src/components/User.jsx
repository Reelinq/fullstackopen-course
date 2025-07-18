import { useParams } from 'react-router-dom'

const User = ({ users }) => {
	const id = useParams().id
	const user = users.find(u => u.id === id)

	if (users.length === 0) return <div>Loading...</div>

	return (
		<>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			{user.blogs.length === 0 ? (
				<p>no blogs added by user</p>
			) : (
				user.blogs.map(blog =>
					<ul key={blog.id}>
						<li>{blog.title}</li>
					</ul>
				)
			)}
		</>
	)
}

export default User