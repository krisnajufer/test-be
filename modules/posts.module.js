const prisma = require('../helpers/database')
const Joi = require('joi')

class Posts {
    listPost = async () => {
        try {
            const posts = await prisma.posts.findMany()

            const message = (posts.length === 0) ? `success get data posts and data is empty` : `success get data posts`
            const code = 200

            const response = {
                code,
                posts,
                message
            }

            return response

        } catch (error) {
            console.error(`listPost on module posts Error : ${error}`)
            const message = `listPost on module posts Error : ${error}`
            const code = 500
            return {
                code,
                message
            }
        }


    }

    createPost = async (body, id) => {
        try {
            const schema = Joi.object({
                title: Joi.string().required().min(3),
                content: Joi.string().required(),
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

            const posts = await prisma.posts.create({
                data: {
                    title: body.title,
                    content: body.content,
                    author_id: parseInt(id)
                }
            })

            const code = 201
            const message = `Success created posts`
            const response = {
                code,
                posts,
                message,
            }

            return response
        } catch (error) {
            console.error(`createPosts on module post Error : ${error}`)
            const message = `listPosts on module post Error : ${error}`
            const code = 500
            return {
                code,
                message
            }
        }
    }

    findPost = async (id) => {
        try {
            const posts = await prisma.posts.findFirst({
                where: {
                    id: parseInt(id)
                }
            })

            const code = 200
            const message = (posts === null) ? `success and data not found` : `success and data found`

            const response = {
                code,
                posts,
                message
            }

            return response
        } catch (error) {
            console.error(`findPost on module post Error : ${error}`)
            const message = `findPost on module post Error : ${error}`
            const code = 500
            return {
                code,
                message
            }
        }

    }

    updatePost = async (body, id, authorId) => {
        try {

            const postsCheck = await prisma.posts.findFirst({
                where: {
                    id: parseInt(id)
                }
            })

            if (!postsCheck) {
                const code = 404
                const message = `Data posts not exist`

                const response = {
                    code,
                    message
                }

                return response
            }
            const schema = Joi.object({
                title: Joi.string().required().min(3),
                content: Joi.string().required(),
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

            const posts = await prisma.posts.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    title: body.title,
                    content: body.content,
                    author_id: parseInt(authorId)
                }
            })

            const code = 200
            const message = `Success updated posts`
            const response = {
                code,
                posts,
                message,
            }

            return response
        } catch (error) {
            console.error(`updatePost on module post Error : ${error}`)
            const message = `updatePost on module post Error : ${error}`
            const code = 500
            return {
                code,
                message
            }
        }
    }

    destroyPost = async (id) => {
        try {
            const posts = await prisma.posts.findFirst({
                where: {
                    id: parseInt(id)
                }
            })

            if (!posts) {
                const code = 404
                const message = `Data posts not exist`

                const response = {
                    code,
                    message
                }

                return response
            }

            await prisma.posts.delete({
                where: {
                    id: parseInt(id)
                }
            })

            const code = 200
            const message = `Success delete data posts`

            const response = {
                code,
                message
            }

            return response
        } catch (error) {
            console.error(`destroyPost on module post Error : ${error}`)
            const message = `destroyPost on module post Error : ${error}`
            const code = 500
            return {
                code,
                message
            }
        }
    }
}

module.exports = new Posts()