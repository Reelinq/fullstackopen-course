const jwt = require('jsonwebtoken')
const assert = require('node:assert')
const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, blogsInDb, initialUsers, usersInDb } = require('../utils/test_helper')

const api = supertest(app)

let authToken

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const insertedUsers = await User.insertMany(initialUsers)

  const user = insertedUsers[0]

  const userForToken = {
    username: user.username,
    id: user._id.toString(),
  }
  authToken = jwt.sign(userForToken, process.env.SECRET)

  const blogsWithUser = initialBlogs.map(blog => ({
    ...blog,
    user: user._id
  }))
  await Blog.insertMany(blogsWithUser)
})

describe('get requests', () => {
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
})

describe('post requests', () => {
  test('new blog can be added with correct values in it', async () => {
    const newBlog = {
      title: 'testBlog',
      author: 'testAuthor',
      url: 'testexample.com',
      likes: 500,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const urls = response.body.map(r => r.url)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    assert(urls.includes('testexample.com'))
  })

  test('initial likes is 0', async () => {
    const newBlog = {
      title: 'testBlog',
      author: 'testAuthor',
      url: 'testexample.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.at(-1).likes, 0)
  })

  test('new blog should include title', async () => {
    const newBlog = {
      author: 'testAuthor',
      url: 'testexample.com',
      likes: 500,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlog)
      .expect(400)
  })

  test('new blog should include url', async () => {
    const newBlog = {
      title: 'testBlog',
      author: 'testAuthor',
      likes: 500,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlog)
      .expect(400)
  })

  test('401 if token is not provided', async () => {
    const newBlog = {
      title: 'testBlog',
      author: 'testAuthor',
      likes: 500,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

describe('delete requests', () => {
  test('blog can be deleted', async () => {
    const blogsAtStart = await blogsInDb()

    await api
      .delete(`/api/blogs/${blogsAtStart[0].id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()

    const urls = blogsAtEnd.map(b => b.url)
    assert(!urls.includes(blogsAtStart[0].url))
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })

  test('deleting a non-existent blog returns 404', async () => {
    const validNonexistentId = new mongoose.Types.ObjectId()

    await api
      .delete(`/api/blogs/${validNonexistentId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404)
  })
})

describe('put requests', () => {
  test('blog can be updated', async () => {
    const blogsAtStart = await blogsInDb()

    const updatedData = {
      title: 'Updated title',
      author: 'Updated author',
      url: 'updated-url.com',
      likes: 1000
    }

    const response = await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.title, updatedData.title)
    assert.strictEqual(response.body.author, updatedData.author)
    assert.strictEqual(response.body.url, updatedData.url)
    assert.strictEqual(response.body.likes, updatedData.likes)

    const blogsAtEnd = await blogsInDb()
    const updatedBlog = blogsAtEnd.find(b => b.id === blogsAtStart[0].id)
    assert.strictEqual(updatedBlog.title, updatedData.title)
  })

  test('put request on a non-existent blog returns 404', async () => {
    const validNonexistentId = new mongoose.Types.ObjectId()

    const updatedData = {
      title: 'Updated title',
      author: 'Updated author',
      url: 'updated-url.com',
      likes: 1000
    }

    await api
      .put(`/api/blogs/${validNonexistentId}`)
      .send(updatedData)
      .expect(404)
  })
})

after(async () => {
  await mongoose.connection.close()
})