import { useDispatch } from 'react-redux'
import '../index.css'
import { likeBlog } from '../reducers/blogsReducer'
import PropTypes from 'prop-types'

const Blog = ({ blog, onHide }) => {
	const dispatch = useDispatch()

	const handleLike = () => {
		dispatch(likeBlog(blog))
	}

	return (
		<>
			<span>
				{blog.title} {blog.author}
			</span>
			<button onClick={onHide}>hide</button>
			<br />
			<span>{blog.url}</span>
			<br />
			<span>likes {blog.likes}</span>
			<button onClick={handleLike}>like</button>
			<br />
			<span>{blog.user?.name || 'unknown'}</span>
		</>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	onHide: PropTypes.func.isRequired
}

export default Blog
