import { useSelector } from 'react-redux'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'
import { selectSortedBlogs } from '../reducers/blogsReducer'

const Blogs = ({ blogFormRef }) => {
	const blogs = useSelector(selectSortedBlogs)

	return (
		<div>
			<Togglable ref={blogFormRef} showCancel={true}>
				<CreateBlog blogFormRef={blogFormRef} />
			</Togglable>

			{blogs.map((blog) => {
				return (
					<div key={blog.id} className="blog">
						<Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
					</div>
				)
			})}
		</div>
	)
}

export default Blogs