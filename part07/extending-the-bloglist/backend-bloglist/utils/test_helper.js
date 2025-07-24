const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		title: 'blogTitle',
		author: 'blogAuthor',
		url: 'example.com',
		likes: 100,
		user: null,
	},
	{
		title: 'anotherBlogTitle',
		author: 'anotherBlogAuthor',
		url: 'anotherexample.com',
		likes: 200,
		user: null,
	},
]

const initialUsers = [
	{
		username: 'username1',
		name: 'name1',
		passwordHash: 'password1',
		blogs: [],
	},
	{
		username: 'username2',
		name: 'name2',
		passwordHash: 'password2',
		blogs: [],
	},
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map((user) => user.toJSON())
}

module.exports = {
	initialBlogs,
	initialUsers,
	blogsInDb,
	usersInDb,
}
