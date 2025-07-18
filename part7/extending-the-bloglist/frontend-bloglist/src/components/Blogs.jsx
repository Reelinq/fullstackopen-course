import { useSelector } from 'react-redux'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'
import { selectSortedBlogs } from '../reducers/blogsReducer'
import { Table } from 'react-bootstrap'

const Blogs = ({ blogFormRef }) => {
	const blogs = useSelector(selectSortedBlogs)

	return (
		<div>
			<Togglable ref={blogFormRef} showCancel={true}>
				<CreateBlog blogFormRef={blogFormRef} />
			</Togglable>
			<Table striped>
				<thead>
					<tr>
						<th>Title</th>
						<th>Author</th>
					</tr>
				</thead>
				<tbody>
					{blogs.map((blog) => (
						<tr key={blog.id}>
							<td>
								<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
							</td>
							<td>{blog.author}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

export default Blogs
