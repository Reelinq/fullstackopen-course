import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import LogIn from './components/LogIn'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import { initializeUsers } from './reducers/usersReducer'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogsReducer'
import { logout } from './reducers/userReducer'
import { initializeUserFromLocalStorage } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const users = useSelector(state => state.users)
	const blogs = useSelector(state => state.blogs)

	const blogFormRef = useRef()

	useEffect(() => {
		dispatch(initializeUserFromLocalStorage())
		dispatch(initializeBlogs())
		dispatch(initializeUsers())
	}, [dispatch])

	return (
		<Router>
			{!user ? (
				<LogIn />
			) : (
				<>
					<h2>blogs</h2>
					<Notification />
					<span>{user.name} logged in</span>
					<button onClick={() => dispatch(logout())}>logout</button>
					<Routes>
						<Route path="/users/:id" element={<User users={users} />} />
						<Route path="/users" element={<Users />} />
						<Route path="/" element={<Blogs blogFormRef={blogFormRef} />} />
						<Route path="/blogs/:id" element={<Blog blogs={blogs} user={user} />} />
					</Routes>
				</>
			)}
		</Router>
	)
}

export default App
