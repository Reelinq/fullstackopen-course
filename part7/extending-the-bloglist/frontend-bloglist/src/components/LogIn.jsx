import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './Notification'
import { login } from '../reducers/userReducer'

const LogIn = () => {
	const dispatch = useDispatch()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()
		dispatch(login({
			username: username,
			password: password
		}))
		setUsername('')
		setPassword('')
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
