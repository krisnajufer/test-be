const { Router } = require('express')
const m$post = require('../modules/posts.module')
const authorize = require('../middleware/auth-middleware')

const PostController = Router()

PostController.get('/', authorize, async (req, res) => {
    const data = await m$post.listPost()

    res.status(data.code).send({ message: data.message, users: data.posts })
})

PostController.post('/', authorize, async (req, res) => {
    const data = await m$post.createPost(req.body, req.users.id)

    res.status(data.code).send((data.code === 201) ? { message: data.message, posts: data.posts } : { message: data.message })
})

PostController.get('/:id', authorize, async (req, res) => {
    const data = await m$post.findPost(req.params.id)

    res.status(data.code).send((data.code === 200 && data.posts !== null) ? { message: data.message, users: data.posts } : { message: data.message })
})

PostController.put('/:id', authorize, async (req, res) => {
    const data = await m$post.updatePost(req.body, req.params.id, req.users.id)

    res.status(data.code).send({ message: data.message, posts: data.posts })
})

PostController.delete('/:id', authorize, async (req, res) => {
    const data = await m$post.destroyPost(req.params.id)

    res.status(data.code).send((data.code === 200) ? { message: data.message, users: data.users } : { message: data.message })
})

module.exports = PostController