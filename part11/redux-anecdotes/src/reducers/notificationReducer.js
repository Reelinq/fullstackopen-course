import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		createNotification(state, action) {
			return action.payload
		},
		removeNotification() {
			return ''
		}
	}
})

export const { createNotification, removeNotification } = notificationSlice.actions

let timeoutId

export const setNotification = (message, seconds) => {
	return dispatch => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		dispatch(createNotification(message))
		timeoutId = setTimeout(() => {
			dispatch(removeNotification())
			timeoutId = null
		}, 1000 * seconds)
	}
}

export default notificationSlice.reducer