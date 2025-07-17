import { useContext } from 'react'
import NotificationContext from '../contexts/notificationContext'

const Notification = () => {
	const [notification, dispatch] = useContext(NotificationContext)

	if (!notification) return null

	if (notification.includes('wrong')) {
		return (
			<div className='info' style={{ color: 'red' }}>
				{notification}
			</div>
		)
	} else {
		return (
			<div className='info'>
				{notification}
			</div>
		)
	}
}

export default Notification
