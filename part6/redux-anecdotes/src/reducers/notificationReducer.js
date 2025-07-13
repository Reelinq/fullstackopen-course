import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
	reducers: {
		createNotification(state, action) {
			return action.payload
		},
		removeNotification(state) {
			return ''
		}
	}
})

let timeoutId

export const showNotification = (message) => {
  return dispatch => {
		if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(createNotification(message))
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
			timeoutId = null
    }, 5000)
  }
}

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer