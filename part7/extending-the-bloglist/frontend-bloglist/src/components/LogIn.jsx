import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { Form, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const LogIn = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()
		await dispatch(
			login({
				username: username,
				password: password,
			}),
		)
		setUsername('')
		setPassword('')
		navigate('/')
	}

	return (
		<div className="d-flex justify-content-center my-5">
			<Card style={{ maxWidth: '600px', width: '100%' }} className="p-4 shadow">
				<h2 className="mb-4 text-center">Log in to application</h2>
				<Form onSubmit={handleLogin}>
					<Form.Group className="mb-3" controlId="formUsername">
						<Form.Label>username:</Form.Label>
						<Form.Control
							data-testid="username"
							type="text"
							value={username}
							name="Username"
							onChange={({ target }) => setUsername(target.value)}
							placeholder="Enter username"
						/>
					</Form.Group>

					<Form.Group className="mb-4" controlId="formPassword">
						<Form.Label>password:</Form.Label>
						<Form.Control
							data-testid="password"
							type="password"
							value={password}
							name="Password"
							onChange={({ target }) => setPassword(target.value)}
							placeholder="Enter password"
						/>
					</Form.Group>

					<Button variant="secondary" type="submit" className="w-100">
						login
					</Button>
				</Form>
			</Card>
		</div>
	)
}

export default LogIn
