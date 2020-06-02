const AuthenticationController = require('./controllers/AuthenticationController')
const LecturesController = require('./controllers/LecturesController')
const CategoriesController = require('./controllers/CategoriesController')
const RolesController = require('./controllers/RolesController')
const UsersController = require('./controllers/UsersController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
// const UserControllerPolicy = require('./policies/UserControllerPolicy')
const isAuthenticated  = require('./policies/isAuthenticated')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg')
    cb(null, true)
    else{
        cb(null, false)
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter
});

module.exports = (app) => {

    
    // LOGIN, REGISTER ROUTES
    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post('/login', AuthenticationController.login)

    //USER ROUTES
    app.get('/users', isAuthenticated, UsersController.index)
    app.get('/users/:userId', isAuthenticated, UsersController.show)
    app.post('/users/:userId/upload', isAuthenticated, upload.single('file'), UsersController.uploadFile)
    app.put('/users/:userId', isAuthenticated, UsersController.put)
    app.delete('/users/:userId', isAuthenticated, UsersController.delete)


    // LECTURE ROUTES
    app.get('/lectures', LecturesController.index)
    app.get('/lectures/:lectureId', LecturesController.show)
    app.get('/lectures/categories/similar/:categoryId/:lectureId', LecturesController.showSimilar)
    app.get('/lectures/categories/other/:categoryId/:lectureId', LecturesController.showDifferent)

    app.put('/lectures/:lectureId', isAuthenticated, LecturesController.put)
    app.post('/lectures', isAuthenticated, LecturesController.post)

    // CATEGORY ROUTES
    app.get('/categories', CategoriesController.index)
    app.post('/categories', isAuthenticated, CategoriesController.create)

    // ROLE ROUTES
    app.get('/roles', RolesController.index)
    app.post('/roles', isAuthenticated, RolesController.create)

    //FILE UPLOAD ROUTE
    // app.post('/upload', upload.single('file'), (req, res) => {
    //     res.json({file: req.file})
    //     console.log(req.file)
    //     console.log(req.body)
    // })
}