import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		insertBlog(state, action) {
			state.push(action.payload)
		},
		setBlogs(state, action) {
			return action.payload
		}
	}
})

export const { insertBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const addBlog = content => {
	return async dispatch => {
		const newBlog = await blogService.create(content)
		dispatch(insertBlog(newBlog))
	}
}

export default blogSlice.reducer