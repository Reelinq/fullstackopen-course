import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LogIn from './components/LogIn'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useReducer } from 'react'
import Notification from './components/Notification'
import ExpandBlog from './components/ExpandBlog'
import { setNotification } from './helpers/notificationHelper'
import NotificationContext from './contexts/notificationContext'
import notificationReducer from './reducers/notificationReducer'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
	const queryClient = useQueryClient()
	const [notification, dispatch] = useReducer(notificationReducer, '')
	const { data: blogs = [], isLoading, error } = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getAll
	})

	const [user, setUser] = useState(null)

	const blogFormRef = useRef()
	const blogRefs = useRef({})

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const deleteBlogMutation = useMutation({
		mutationFn: blogService.remove,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
		},
		onError: (error) => {
			setNotification(dispatch, `Error deleting blog: ${error.message}`)
		}
	})

	const handleDeletion = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			deleteBlogMutation.mutate(blog)
		}
	}

	const loginForm = () => (
		<LogIn setUser={setUser} />
	)

	const blogForm = () => {
		if (isLoading) return <div>Loading blogs...</div>
		if (error) return <div>Error loading blogs: {error.message}</div>

		return (
			<div>
				<h2>blogs</h2>
				<Notification />
				<span>{user.name} logged in</span>
				<button onClick={handleLogout}>logout</button>
				<br /><br />
				<Togglable ref={blogFormRef} showCancel={true}>
					<CreateBlog blogFormRef={blogFormRef} />
				</Togglable>

				{[].concat(blogs)
					.sort((a, b) => b.likes - a.likes)
					.map(blog => {
						const isCreator = blog.user && (blog.user.id === user.id)

						if (!blogRefs.current[blog.id]) {
							blogRefs.current[blog.id] = React.createRef()
						}

						return (
							<div key={blog.id} className='blog'>
								<ExpandBlog blog={blog} ref={blogRefs.current[blog.id]}>
									<Blog
										blog={blog}
										onHide={() => blogRefs.current[blog.id].current.toggleVisibility()}
									/>
									<br />
									{isCreator && (
										<button onClick={() => handleDeletion(blog)}>remove</button>
									)}
								</ExpandBlog>
							</div>
						)
					})
				}
			</div>
		)
	}

	return (
		<NotificationContext.Provider value={[notification, dispatch]}>
			<div>
				{!user && loginForm()}
				{user && blogForm()}
			</div>
		</NotificationContext.Provider>
	)
}

export default App