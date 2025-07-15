import { useSelector } from 'react-redux'
import '../index.css'

const Notification = () => {
	const message = useSelector((state) => state.notification)

	if (!message) return

	const isError = message.toLowerCase().includes('wrong')
	const style = { color: isError ? 'red' : 'green' }

	return (
		<div className="info" style={style}>
			{message}
		</div>
	)
}

export default Notification
