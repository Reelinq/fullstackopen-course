let timeoutId = null

export const setNotification = (dispatch, message) => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  dispatch({ type: 'SET_NOTIFICATION', payload: message })

  timeoutId = setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' })
    timeoutId = null
  }, 5000)
}