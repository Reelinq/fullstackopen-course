import blogService from '../services/blogs'

export const setUser = (dispatch, user) => {
	dispatch({ type: 'SET_USER', payload: user })
	window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
	blogService.setToken(user.token)
}

export const clearUser = (dispatch) => {
	dispatch({ type: 'CLEAR_USER' })
	window.localStorage.removeItem('loggedBlogappUser')
}
