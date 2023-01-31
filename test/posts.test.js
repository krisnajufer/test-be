const request = require('supertest')
const app = require('./server')
const port = 4041

beforeAll(async () => {
    server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })

    const login = {
        email: "superadmin@admin.com",
        password: "admin"
    }
    const res = await request(server).post('/api/login').send(login)
    token = res._body.token
})

afterAll((done) => {
    done()
    server.close()
})

describe('Posts', () => {
    let id

    test('List posts', async () => {
        const res = await request(server).get('/api/posts').set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    test('Create post', async () => {
        const add = {
            title: 'test',
            content: 'just wanna test'
        }
        const res = await request(app).post('/api/posts').send(add).set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(201)
        id = res._body.posts.id
        // console.log(res);
    })


    test('Find post', async () => {
        const res = await request(server).get('/api/posts/' + id).set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    test('Update post', async () => {
        const put = {
            title: 'testing',
            content: 'just wanna testing'
        }
        const res = await request(app).put('/api/posts/' + id).send(put).set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    });

    test('Destroy post', async () => {
        const res = await request(app).delete('/api/posts/' + id).set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

})
