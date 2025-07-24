import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef(({ children }, ref) => {
	const [visible, setVisible] = useState(false)

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => ({
		toggleVisibility,
	}))

	return (
		<>
			<span style={{ display: visible ? 'none' : '' }}>
				<Button variant="secondary" onClick={toggleVisibility}>
					create new blog
				</Button>
			</span>

			<span style={{ display: visible ? '' : 'none' }}>{children}</span>
		</>
	)
})

Togglable.displayName = 'Togglable'

export default Togglable
