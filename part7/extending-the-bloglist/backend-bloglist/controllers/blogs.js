const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
		.populate('user', { username: 1, name: 1 })
		.populate('comments')
	response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
	const user = request.user

	const blog = new Blog({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		user: user._id,
	})

	let savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	savedBlog = await savedBlog.populate('user', { username: 1, name: 1 })

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (!blog) {
		return response.status(404).json({ error: 'Blog not found' })
	}

	if (blog.user.toString() !== request.user._id.toString()) {
		return response
			.status(403)
			.json({ error: 'you do not have permission to delete this blog' })
	}

	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const { title, author, url, likes } = request.body

	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		{ title, author, url, likes },
		{ new: true, runValidators: true, context: 'query' },
	)
	if (!updatedBlog) return response.status(404).end()
	response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
	const blogId = request.params.id
	const { content } = request.body
	const blog = await Blog.findById(blogId)

	const comment = new Comment({
		content: content.trim(),
		blog: blogId,
	})

	const savedComment = await comment.save()

	blog.comments = blog.comments.concat(savedComment._id)
	await blog.save()

	response.status(201).json(savedComment)
})

module.exports = blogsRouter
