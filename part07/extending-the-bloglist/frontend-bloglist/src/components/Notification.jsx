import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
	const message = useSelector((state) => state.notification)

	if (!message) return

	const isError = message.toLowerCase().includes('wrong')

	if (isError) {
		return <Alert variant="danger">{message}</Alert>
	}
	return <Alert variant="success">{message}</Alert>
}

export default Notification
