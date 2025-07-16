import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload
		},
		clearUser() {
			return null
		}
	}
})

export const { setUser, clearUser } = userSlice.actions

export const initializeUserFromLocalStorage = () => {
	return dispatch => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			blogService.setToken(user.token)
			dispatch(setUser(user))
		}
	}
}

export const logout = () => {
	return dispatch => {
		window.localStorage.removeItem('loggedBlogappUser')
		blogService.setToken(null)
		dispatch(clearUser())
	}
}

export const login = (credentials) => {
	return async dispatch => {
		try {
			const user = await loginService.login(credentials)
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			dispatch(setUser(user))
		} catch (error) {
			dispatch(setNotification('wrong username or password'))
		}
	}
}

export default userSlice.reducer