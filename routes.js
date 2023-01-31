// Define Controller on Routes
const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')
const AuthController = require('./controllers/AuthController')
// Define url api and use controller
const _routes = [
    // example ['url', controller]
    ['users', UserController],
    ['posts', PostController],
    ['', AuthController],
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route

        // http://localhost:8080/api
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes