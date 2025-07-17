import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import LogIn from './components/LogIn'
import Blogs from './components/Blogs'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUserFromLocalStorage } from './reducers/userReducer'

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const blogFormRef = useRef()
	const blogRefs = useRef({})

	useEffect(() => {
		dispatch(initializeUserFromLocalStorage())
		dispatch(initializeBlogs())
	}, [dispatch])

	return (
		<div>
			{!user ? <LogIn /> : <Blogs user={user} blogRefs={blogRefs} blogFormRef={blogFormRef} />}
		</div>
	)
}

export default App
