const Joi = require('joi');
const prisma = require('../helpers/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class Auth {
    login = async (body) => {
        try {
            const schema = Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required()
            }).options({ abortEarly: false })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }
            const user = await prisma.users.findFirst({
                where: {
                    email: body.email
                }
            })

            // Kalau user tidak ada return error
            if (!user) {
                return {
                    status: false,
                    code: 404,
                    error: 'User not found'
                }
            }

            if (!bcrypt.compareSync(body.password, user.password)) {
                return {
                    status: false,
                    code: 401,
                    error: 'Wrong Password'
                }
            }

            const payload = {
                id: user.id,
                email: user.email
            }

            const token = jwt.sign(payload, 'jwt-secret-code', { expiresIn: "8h" })

            const code = 200
            const response = {
                code,
                token
            }
            return response

        } catch (error) {
            console.error('login auth module Error:', error);

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new Auth()