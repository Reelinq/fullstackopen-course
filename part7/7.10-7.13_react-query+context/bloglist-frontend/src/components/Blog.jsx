import '../index.css'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog, onHide }) => {
	const queryClient = useQueryClient()

	const likeMutation = useMutation({
		mutationFn: blogService.updateLikes,
		onSuccess: (updatedBlog) => {
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
		},
		onError: (error) => {
			setNotification(dispatch, `Error liking blog: ${error.message}`)
		}
	})

	const handleLike = async () => {
		likeMutation.mutate(blog)
	}

	return (
		<>
			<span>{blog.title} {blog.author}</span>
			<button onClick={onHide}>hide</button><br />
			<span>{blog.url}</span><br />
			<span>likes {blog.likes}</span>
			<button onClick={handleLike}>like</button><br />
			<span>{blog.user?.name || 'unknown'}</span>
		</>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	onHide: PropTypes.func.isRequired
}

export default Blog