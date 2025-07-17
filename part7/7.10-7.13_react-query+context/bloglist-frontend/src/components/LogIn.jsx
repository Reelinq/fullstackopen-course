import { useState, useContext } from 'react'
import loginService from '../services/login'
import Notification from './Notification'
import NotificationContext from '../contexts/notificationContext'
import UserContext from '../contexts/userContext'
import { setNotification } from '../helpers/notificationHelper'
import { setUser } from '../helpers/userHelper'

const LogIn = () => {
	const [notification, notificationDispatch] = useContext(NotificationContext)
	const [user, userDispatch] = useContext(UserContext)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username,
				password,
			})

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			setUser(userDispatch, user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setNotification(notificationDispatch, 'wrong username or password')
		}
	}

	return (
		<div>
			<h2>Log in to application</h2>
			<Notification />
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						data-testid="username"
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						data-testid="password"
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default LogIn
