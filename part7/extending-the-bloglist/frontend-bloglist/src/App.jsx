import { useEffect, useRef, useState } from 'react'
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
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'

const App = () => {
	const dispatch = useDispatch()
	const users = useSelector(state => state.users)
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)

	const [isReady, setIsReady] = useState(false)

	const blogFormRef = useRef()

	useEffect(() => {
		dispatch(initializeUserFromLocalStorage())
		dispatch(initializeBlogs())
		dispatch(initializeUsers())
		setIsReady(true)
	}, [dispatch])

	if (!isReady) return <div>Loading...</div>

	return (
		<Router>
			<div style={{ backgroundColor: 'lightgray', padding: '5px' }}>
				<Link style={{ padding: 5 }} to="/">blogs</Link>
				<Link style={{ padding: 5 }} to="/users">users</Link>
				{user
					? <><span style={{ padding: 5 }}>{user.name} logged in</span><button onClick={() => dispatch(logout())}>logout</button></>
					: <Link style={{ padding: 5 }} to="/login">login</Link>
				}
			</div>
			<Notification />
			<h2>blog app</h2>
			<Routes>
				<Route path="/users/:id" element={<User users={users} />} />
				<Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
				<Route path="/login" element={<LogIn />} />
				<Route path="/" element={user ? <Blogs blogFormRef={blogFormRef} /> : <Navigate replace to="/login" />} />
				<Route path="/blogs/:id" element={<Blog blogs={blogs} user={user} />} />
			</Routes>
		</Router >
	)
}

export default App
