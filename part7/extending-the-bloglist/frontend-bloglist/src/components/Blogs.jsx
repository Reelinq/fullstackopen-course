import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateBlog from './CreateBlog'
import Notification from './Notification'
import Blog from './Blog'
import ExpandBlog from './ExpandBlog'
import Togglable from './Togglable'
import { logout } from '../reducers/userReducer'
import { removeBlog } from '../reducers/blogsReducer'
import { selectSortedBlogs } from '../reducers/blogsReducer'

const Blogs = ({ user, blogRefs, blogFormRef }) => {
	const dispatch = useDispatch()
	const blogs = useSelector(selectSortedBlogs)

	return (
		<div>
			<h2>blogs</h2>
			<Notification />
			<span>{user.name} logged in</span>
			<button onClick={() => dispatch(logout())}>logout</button>
			<br />
			<br />
			<Togglable ref={blogFormRef} showCancel={true}>
				<CreateBlog blogFormRef={blogFormRef} />
			</Togglable>

			{blogs.map((blog) => {
				const isCreator = blog.user && blog.user.id === user.id

				if (!blogRefs.current[blog.id]) {
					blogRefs.current[blog.id] = React.createRef()
				}

				return (
					<div key={blog.id} className="blog">
						<ExpandBlog blog={blog} ref={blogRefs.current[blog.id]}>
							<Blog
								blog={blog}
								onHide={() =>
									blogRefs.current[blog.id].current.toggleVisibility()
								}
							/>
							<br />
							{isCreator && (
								<button onClick={() => dispatch(removeBlog(blog))}>remove</button>
							)}
						</ExpandBlog>
					</div>
				)
			})}
		</div>
	)
}

export default Blogs