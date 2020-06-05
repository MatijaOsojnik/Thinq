const AuthenticationController = require('./controllers/AuthenticationController')
const LecturesController = require('./controllers/LecturesController')
const CategoriesController = require('./controllers/CategoriesController')
const RolesController = require('./controllers/RolesController')
const UsersController = require('./controllers/UsersController')

const authJwt = require('./middleware/authJwt')

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
    app.post('/api/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post('/api/login', AuthenticationController.login)

    //USER ROUTES
    app.get('/api/users', UsersController.index)
    app.get('/api/users/:userId', isAuthenticated, UsersController.show)
    app.post('/api/users/:userId/upload', isAuthenticated, upload.single('file'), UsersController.uploadFile)
    app.put('/api/users/:userId', isAuthenticated, UsersController.put)
    app.delete('/api/users/:userId', isAuthenticated, UsersController.delete)

    // LECTURE ROUTES
    app.get('/api/lectures', LecturesController.index)
    app.get('/api/lectures/:lectureId', LecturesController.show)
    app.get('/api/lectures/categories/similar/:categoryId/:lectureId', LecturesController.showSimilar)
    app.get('/api/lectures/categories/other/:categoryId/:lectureId', LecturesController.showDifferent)

    app.put('/api/lectures/:lectureId', LecturesController.put)
    app.post('/api/lectures', LecturesController.post)

    // CATEGORY ROUTES
    app.get('/api/categories', CategoriesController.index)
    app.post('/api/categories', isAuthenticated, CategoriesController.create)

    // ROLE ROUTES
    app.get('/api/roles', RolesController.index)
    app.post('/api/roles', isAuthenticated, RolesController.create)

    //FILE UPLOAD ROUTE
    // app.post('/upload', upload.single('file'), (req, res) => {
    //     res.json({file: req.file})
    //     console.log(req.file)
    //     console.log(req.body)
    // })
}