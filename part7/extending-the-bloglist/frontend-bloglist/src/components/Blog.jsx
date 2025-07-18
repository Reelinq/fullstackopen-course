import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../index.css'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import { initializeUsers } from '../reducers/usersReducer'

const Blog = ({ blogs, user }) => {
	const id = useParams().id
	const blog = blogs.find(b => b.id === id)

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

	if (blogs.length === 0) return <div>Loading...</div>

	const isCreator = blog.user && blog.user.id === user.id

	return (
		<>
			<h2>{blog.title} {blog.author}</h2>
			<a href={blog.url}>{blog.url}</a>
			<br />
			<span>likes {blog.likes}</span>
			<button onClick={handleLike}>like</button>
			<br />
			<span>added by {blog.user?.name || 'unknown'}</span>
			{isCreator && (
				<button onClick={handleRemove}>remove</button>
			)}
		</>
	)
}

Blog.propTypes = {
	blogs: PropTypes.array.isRequired
}

export default Blog
