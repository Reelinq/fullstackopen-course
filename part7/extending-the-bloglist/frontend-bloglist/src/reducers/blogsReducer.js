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
		},
		likeSelected(state, action) {
			const updated = action.payload
			return state.map(b =>
				b.id !== updated.id ? b : updated
			)
		},
		removeSelected(state, action) {
			const idToRemove = action.payload
			return state.filter(b => b.id !== idToRemove)
		}
	}
})

export const { insertBlog, setBlogs, likeSelected, removeSelected } = blogSlice.actions

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

export const likeBlog = blog => {
	return async dispatch => {
		const likedBlogResponse = await blogService.updateLikes(blog)
		const likedBlog = { ...likedBlogResponse, user: blog.user }
		dispatch(likeSelected(likedBlog))
	}
}

export const removeBlog = blog => {
	return async dispatch => {
		await blogService.remove(blog)
		dispatch(removeSelected(blog.id))
	}
}

export default blogSlice.reducer