const prisma = require('../helpers/database')
const Joi = require('joi')
const bcrypt = require('bcrypt')

class Users {
    listUser = async () => {
        try {
            const users = await prisma.users.findMany()

            const message = (users.length === 0) ? `success get data users and data is empty` : `success get data users`
            const code = 200

            const response = {
                code,
                users,
                message
            }

            return response
        } catch (error) {
            console.error(`listUser on module user Error : ${error}`)
            const message = `listUser on module user Error : ${error}`
            const code = 500
            return {
                code,
                message
            }
        }
    }

    createUser = async (body) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required().min(3),
                email: Joi.string().email().required(),
                password: Joi.string().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const message = validation.error.details.map(detail => detail.message)
                const code = 400

                const response = {
                    code,
                    message
                }

                return response
            }

            const password = bcrypt.hashSync(body.password, 10)
            const checkEmail = await prisma.users.findFirst({
                where: {
                    email: body.email
                }
            })

            if (checkEmail) {
                const code = 409
                const message = `Email ${body.email} already exist`

                const response = {
                    code,
                    message
                }

                return response
            }
            const users = await prisma.users.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password
                }
            })

            const code = 201
            const message = `Success created users`
            const response = {
                code,
                users,
                message,
            }

            return response
        } catch (error) {
            console.error(`createUser on module user Error : ${error}`)
            const message = `listUser on module user Error : ${error}`
            const code = 500
            return {
                code,
                message
            }
        }
    }

    findUser = async (id) => {
        try {
            const users = await prisma.users.findFirst({
                where: {
                    id: parseInt(id)
                }
            })

            const code = 200
            const message = (users === null) ? `success and data not found` : `success and data found`

            const response = {
                code,
                users,
                message
            }

            return response
        } catch (error) {
            console.error(`findUser on module user Error : ${error}`)
            const message = `findUser on module user Error : ${error}`
            const code = 500
            return {
                code,
                message
            }
        }

    }

    updateUser = async (body, id) => {
        try {

            const usersCheck = await prisma.users.findFirst({
                where: {
                    id: parseInt(id)
                }
            })

            if (!usersCheck) {
                const code = 404
                const message = `Data users not exist`

                const response = {
                    code,
                    message
                }

                return response
            }
            const schema = Joi.object({
                name: Joi.string().required().min(3),
                email: Joi.string().email().required(),
                password: Joi.string().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const message = validation.error.details.map(detail => detail.message)
                const code = 400

                const response = {
                    code,
                    message
                }

                return response
            }

            const password = bcrypt.hashSync(body.password, 10)
            const userBefore = await prisma.users.findFirst({
                where: {
                    id: parseInt(id)
                }
            })

            const checkEmail = await prisma.users.findFirst({
                where: {
                    email: body.email,
                    NOT: {
                        email: userBefore.email
                    }
                }
            })

            if (checkEmail) {
                const code = 409
                const message = `Email ${body.email} already exist`

                const response = {
                    code,
                    message
                }

                return response
            }
            const users = await prisma.users.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name: body.name,
                    email: body.email,
                    password
                }
            })

            const code = 200
            const message = `Success updated users`
            const response = {
                code,
                users,
                message,
            }

            return response
        } catch (error) {
            console.error(`updatedUser on module user Error : ${error}`)
            const message = `updatedUser on module user Error : ${error}`
            const code = 500
            return {
                code,
                message
            }
        }
    }

    destroyUser = async (id) => {
        try {
            const users = await prisma.users.findFirst({
                where: {
                    id: parseInt(id)
                }
            })

            if (!users) {
                const code = 404
                const message = `Data users not exist`

                const response = {
                    code,
                    message
                }

                return response
            }

            await prisma.users.delete({
                where: {
                    id: parseInt(id)
                }
            })

            const code = 200
            const message = `Success delete data users`

            const response = {
                code,
                message
            }

            return response
        } catch (error) {
            console.error(`destroyUser on module user Error : ${error}`)
            const message = `destroyUser on module user Error : ${error}`
            const code = 500
            return {
                code,
                message
            }
        }
    }
}

module.exports = new Users()