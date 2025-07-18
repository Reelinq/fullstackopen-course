import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { Button, Navbar, Nav, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

const Navigation = ({ user }) => {
	const dispatch = useDispatch()

	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg="dark"
			variant="dark"
			className="mb-4 px-3"
		>
			<Navbar.Brand as={Link} to="/">
				blog app
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link as={Link} to="/">
						blogs
					</Nav.Link>
					<Nav.Link as={Link} to="/users">
						users
					</Nav.Link>
				</Nav>
				<Nav className="ms-auto">
					{user ? (
						<>
							<Navbar.Text className="me-2">{user.name} logged in</Navbar.Text>
							<Button
								variant="outline-light"
								size="sm"
								onClick={() => dispatch(logout())}
							>
								logout
							</Button>
						</>
					) : (
						<Nav.Link as={Link} to="/login">
							login
						</Nav.Link>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Navigation
