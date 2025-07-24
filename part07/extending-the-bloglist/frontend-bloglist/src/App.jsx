import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LogIn from './components/LogIn'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUserFromLocalStorage } from './reducers/userReducer'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const App = () => {
	const dispatch = useDispatch()
	const users = useSelector((state) => state.users)
	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.user)

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
		<>
			<Navigation user={user} />
			<Container fluid className="px-4 my-4">
				<Notification />
				<Routes>
					<Route path="/users/:id" element={<User users={users} />} />
					<Route
						path="/users"
						element={user ? <Users /> : <Navigate replace to="/login" />}
					/>
					<Route path="/login" element={<LogIn />} />
					<Route
						path="/"
						element={
							user ? (
								<Blogs blogFormRef={blogFormRef} />
							) : (
								<Navigate replace to="/login" />
							)
						}
					/>
					<Route
						path="/blogs/:id"
						element={<Blog blogs={blogs} user={user} />}
					/>
				</Routes>
			</Container>
		</>
	)
}

export default App
