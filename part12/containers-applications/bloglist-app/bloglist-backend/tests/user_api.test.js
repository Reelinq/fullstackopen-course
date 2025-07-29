const assert = require('node:assert')
const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const _ = require('lodash')
const app = require('../app')
const User = require('../models/user')
const { initialUsers, usersInDb } = require('../utils/test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

describe('post requests', () => {
  test('user creation with valid inputs', async () => {
    const newUser = {
      username: 'username',
      name: 'name',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert(usersAtEnd.some(u => u.username === newUser.username))
  })

  test('username less than 3 chars', async () => {
    const user = {
      username: 'us',
      name: 'name',
      password: 'password'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.match(response.body.error, /(?=.*username)(?=.*length \(3\))/)
  })

  test('password less than 3 chars', async () => {
    const user = {
      username: 'username',
      name: 'name',
      password: 'pa'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.match(response.body.error, /(?=.*password)(?=.*3 characters)/)
  })

  test('username already exists', async () => {
    const duplicateUser = {
      username: initialUsers[0].username,
      name: 'name',
      password: 'password'
    }

    const response = await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.match(response.body.error, /unique/)
  })

  test('missing username', async () => {
    const user = {
      name: 'name',
      password: 'password'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.match(response.body.error, /(?=.*username)(?=.*required)/)
  })

  test('missing password', async () => {
    const user = {
      username: 'username',
      name: 'name'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.match(response.body.error, /(?=.*password)(?=.*required)/)
  })
})

after(async () => {
  await mongoose.connection.close()
})