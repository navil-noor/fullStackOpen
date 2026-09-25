const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api  = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    }  
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

// test.only('test for id', async () => {
//     const response = await api.get('/api/blogs')
//     console.log(response.body)
//     assert(response.body[0].id)
// })

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    assert(titles.includes('Type wars'))
})

test('likes property default is 0', async () => {
    const noLikesBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
    }

    await api
        .post('/api/blogs')
        .send(noLikesBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body[2].likes, 0)
})

test('missing title or url', async () => {
    const infoMissBlog = {
        author: "Robert C. Martin",
        likes: 10
    }

    await api
        .post('/api/blogs')
        .send(infoMissBlog)
        .expect(400)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('deleting a blog', async () => {

    const response = await api.get('/api/blogs')
    const originalLength = response.body.length
    const blogToDelete = response.body[1]
    
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsLeft = await api.get('/api/blogs')
    
    assert.strictEqual(blogsLeft.body.length, originalLength - 1)
})

test('changing likes', async () => {
    const response = await api.get('/api/blogs')
    const blogToTest = response.body[0]
    const newLikes = blogToTest.likes + 5

    await api
        .put(`/api/blogs/${blogToTest.id}`)
        .send({likes: newLikes})
        .expect(200)
    
    const updatedBlog = await api.get(`/api/blogs/${blogToTest.id}`)
    
    assert.strictEqual(updatedBlog.body.likes, newLikes)
})

after(async () => {
    await mongoose.connection.close()
})