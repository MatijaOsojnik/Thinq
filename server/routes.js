const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const LecturesController = require('./controllers/LecturesController')
const CategoriesController = require('./controllers/CategoriesController')
const RolesController = require('./controllers/RolesController')

module.exports = (app) => {
    // LOGIN, REGISTER ROUTES
    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post('/login', AuthenticationController.login)

    // LECTURE ROUTES
    app.get('/lectures', LecturesController.index)
    app.get('/lectures/:lectureId', LecturesController.findOne)
    app.post('/lectures', LecturesController.create)

    // CATEGORY ROUTES
    app.get('/categories', CategoriesController.index)
    app.post('/categories', CategoriesController.create)

    // ROLE ROUTES

    app.get('/roles', RolesController.index)
    app.post('/roles', RolesController.create)
}