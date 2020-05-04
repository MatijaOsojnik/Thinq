const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const LecturesController = require('./controllers/LecturesController')
const CategoriesController = require('./controllers/CategoriesController')

module.exports = (app) => {
    // LOGIN, REGISTER ROUTES
    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post('/login', AuthenticationController.login)

    // LECTURE ROUTES
    app.get('/lectures', LecturesController.index)
    app.post('/lectures', LecturesController.create)

    // CATEGORY ROUTES
    app.get('/categories', CategoriesController.index)
    app.post('/categories', CategoriesController.create)
}