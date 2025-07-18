import { createSlice, createSelector } from '@reduxjs/toolkit'
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
		},
		addCommentToBlog(state, action) {
			const { blogId, comment } = action.payload
			const blog = state.find(b => b.id === blogId)
			if (blog) {
				if (!blog.comments) {
					blog.comments = []
				}
				blog.comments.push(comment)
			}
		}
	}
})

export const { insertBlog, setBlogs, likeSelected, removeSelected, addCommentToBlog } = blogSlice.actions

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const selectSortedBlogs = createSelector(
	(state) => state.blogs,
	(blogs) => [...blogs].sort((a, b) => b.likes - a.likes)
)

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
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			await blogService.remove(blog)
			dispatch(removeSelected(blog.id))
		}
	}
}

export const addComment = (blogId, commentContent) => {
	return async dispatch => {
		const newComment = await blogService.createComment(blogId, { content: commentContent })
		dispatch(addCommentToBlog({ blogId, comment: newComment }))
	}
}

export default blogSlice.reducer