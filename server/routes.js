const AuthenticationController = require('./controllers/AuthenticationController')
const LecturesController = require('./controllers/LecturesController')
const CategoriesController = require('./controllers/CategoriesController')
const RolesController = require('./controllers/RolesController')
const UsersController = require('./controllers/UsersController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const UserControllerPolicy = require('./policies/UserControllerPolicy')
const isAuthenticated  = require('./policies/isAuthenticated')
module.exports = (app) => {
    // LOGIN, REGISTER ROUTES
    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post('/login', AuthenticationController.login)

    //USER ROUTES
    app.get('/users', UsersController.index)
    app.get('/users/:userId', UsersController.show)
    app.put('/users/:userId', UsersController.put)
    app.delete('/users/:userId', UsersController.delete)


    // LECTURE ROUTES
    app.get('/lectures', LecturesController.index)
    app.get('/lectures/:lectureId', LecturesController.show)
    app.get('/lectures/categories/similar/:categoryId/:lectureId', LecturesController.showSimilar)
    app.get('/lectures/categories/other/:categoryId/:lectureId', LecturesController.showDifferent)

    app.put('/lectures/:lectureId', LecturesController.put)
    app.post('/lectures', isAuthenticated, LecturesController.post)

    // CATEGORY ROUTES
    app.get('/categories', CategoriesController.index)
    app.post('/categories', isAuthenticated, CategoriesController.create)

    // ROLE ROUTES

    app.get('/roles', RolesController.index)
    app.post('/roles', isAuthenticated, RolesController.create)
}