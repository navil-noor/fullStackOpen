const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api  = supertest(app)

const initialUsers = [
    {
        username: "Tom",
        passwordHash: "123456",
    },
    {
        username: "Jerry",
        passwordHash: "987654",
    },
]

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
    userObject = new User(initialUsers[1])
    await userObject.save()
})

test('short username test', async () => {
    const response = await api.get('/api/users')
    const startLength = response.body.length
    
    const testUser = {
        username: "yo",
        password: "123456"
    }

    const result =  await api
                        .post('/api/users')
                        .send(testUser)
                        .expect(400)
    
    const updatedUsers = await api.get('/api/users')

    assert.strictEqual(result.body.error, 'Username or Password is too short!')
    assert.strictEqual(startLength, updatedUsers.body.length)
})

test('missing username', async () => {
    const response = await api.get('/api/users')
    const startLength = response.body.length

    const noUsername = {
        password: "123456"
    }

    const result = await api
                        .post('/api/users')
                        .send(noUsername)
                        .expect(400)
    
    const updatedUsers = await api.get('/api/users')
    assert.strictEqual(result.body.error, 'Please provide username and password!')
    assert.strictEqual(updatedUsers.body.length, startLength)
})

test('duplicate username', async () => {
    const response = await api.get('/api/users')
    const startLength = response.body.length

    const sameUser = {
        username: "Tom",
        password: "456123"
    }

    const result = await api
                        .post('/api/users')
                        .send(sameUser)
                        .expect(400)
    
    const updatedUsers = await api.get('/api/users')
    assert.strictEqual(updatedUsers.body.length, startLength)
})

after(async () => {
    await mongoose.connection.close()
})