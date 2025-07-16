import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LogIn from './components/LogIn'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import ExpandBlog from './components/ExpandBlog'
import { initializeBlogs, removeBlog } from './reducers/blogsReducer'
import { initializeUserFromLocalStorage, logout } from './reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const App = () => {
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const blogFormRef = useRef()
	const blogRefs = useRef({})

	useEffect(() => {
		dispatch(initializeUserFromLocalStorage())
		dispatch(initializeBlogs())
	}, [dispatch])

	const handleDeletion = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			await dispatch(removeBlog(blog))
		}
	}

	const loginForm = () => <LogIn />

	const blogForm = () => (
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

			{[]
				.concat(blogs)
				.sort((a, b) => b.likes - a.likes)
				.map((blog) => {
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
									<button onClick={() => handleDeletion(blog)}>remove</button>
								)}
							</ExpandBlog>
						</div>
					)
				})}
		</div>
	)

	return (
		<div>
			{!user && loginForm()}
			{user && blogForm()}
		</div>
	)
}

export default App
