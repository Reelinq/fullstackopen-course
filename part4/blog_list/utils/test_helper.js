const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'blogTitle',
    author: 'blogAuthor',
    url: 'example.com',
    likes: 100
  },
  {
    title: 'anotherBlogTitle',
    author: 'anotherBlogAuthor',
    url: 'anotherexample.com',
    likes: 200
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}