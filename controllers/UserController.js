const { Router } = require('express')
const m$user = require('../modules/users.module')
const authorize = require('../middleware/auth-middleware')

const UserController = Router()

UserController.get('/', async (req, res) => {
    const data = await m$user.listUser()

    res.status(data.code).send({ message: data.message, users: data.users })
})

UserController.post('/', async (req, res) => {
    const data = await m$user.createUser(req.body)

    res.status(data.code).send((data.code === 201) ? { message: data.message, users: data.users } : { message: data.message })
})

UserController.get('/:id', async (req, res) => {
    const data = await m$user.findUser(req.params.id)

    res.status(data.code).send((data.code === 200 && data.users !== null) ? { message: data.message, users: data.users } : { message: data.message })
})

UserController.put('/:id', async (req, res) => {
    const data = await m$user.updateUser(req.body, req.params.id)

    res.status(data.code).send({ message: data.message, users: data.users })
})

UserController.delete('/:id', async (req, res) => {
    const data = await m$user.destroyUser(req.params.id)

    res.status(data.code).send((data.code === 200) ? { message: data.message, users: data.users } : { message: data.message })
})

module.exports = UserController