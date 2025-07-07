const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'blogTitle',
    author: 'blogAuthor',
    url: 'example.com',
    likes: 100,
  },
  {
    title: 'anotherBlogTitle',
    author: 'anotherBlogAuthor',
    url: 'anotherexample.com',
    likes: 200,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('correct amount of blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    assert.ok(blog.id, 'Expected blog to have property id')
  })
})

test('new blog can be added with correct values in it', async () => {
  const newBlog = {
    title: 'testBlog',
    author: 'testAuthor',
    url: 'testexample.com',
    likes: 500,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const urls = response.body.map(r => r.url)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  assert(urls.includes('testexample.com'))
})

after(async () => {
  await mongoose.connection.close()
})