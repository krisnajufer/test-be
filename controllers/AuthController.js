const { Router } = require('express')
const m$auth = require('../modules/auth.module')

const AuthController = Router()

AuthController.post('/login', async (req, res) => {
    const data = await m$auth.login(req.body)

    res.status(data.code).send({ token: data.token })
})

module.exports = AuthController