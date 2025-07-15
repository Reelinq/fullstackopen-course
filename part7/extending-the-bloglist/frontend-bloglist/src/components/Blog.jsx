import '../index.css'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, onHide }) => {
	const handleLike = async () => {
		const updated = await blogService.updateLikes(blog)
		updated.user = blog.user
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
