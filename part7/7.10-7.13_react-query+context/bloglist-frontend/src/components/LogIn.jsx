import { useState, useContext } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'
import PropTypes from 'prop-types'
import NotificationContext from '../contexts/notificationContext'
import { setNotification } from '../helpers/notificationHelper'

const LogIn = ({ setUser }) => {
	const [notification, dispatch] = useContext(NotificationContext)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			setUser(user)
			blogService.setToken(user.token)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setNotification(dispatch, 'wrong username or password')
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
						data-testid='username'
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						data-testid='password'
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

LogIn.propTypes = {
	setUser: PropTypes.func.isRequired
}

export default LogIn