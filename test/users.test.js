const request = require('supertest')
const app = require('./server')
const port = 4041

beforeAll(async () => {
    server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
})

afterAll((done) => {
    done()
    server.close()
})

describe('Users', () => {
    let id

    test('List Users', async () => {
        const res = await request(server).get('/api/users')
        expect(res.status).toBe(200)
    })

    test('Create User', async () => {
        const add = {
            name: "test",
            email: "test@gmail.com",
            password: "test123"
        }
        const res = await request(app).post('/api/users').send(add)
        expect(res.status).toBe(201)
        id = res._body.users.id
    })


    test('Find User', async () => {
        const res = await request(server).get('/api/users/' + id)
        expect(res.status).toBe(200)
    })

    test('Update User', async () => {
        const put = {
            name: "testing",
            email: "testing@test.com",
            password: "testing"
        }
        const res = await request(app).put('/api/users/' + id).send(put)
        expect(res.status).toBe(200)
    });

    test('Destroy User', async () => {
        const res = await request(app).delete('/api/users/' + id)
        expect(res.status).toBe(200)
    })

})
