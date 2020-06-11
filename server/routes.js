const AuthenticationController = require('./controllers/AuthenticationController')
const LecturesController = require('./controllers/LecturesController')
const CategoriesController = require('./controllers/CategoriesController')
const RolesController = require('./controllers/RolesController')
const UsersController = require('./controllers/UsersController')

// const authJwt = require('./middleware/authJwt')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
// const UserControllerPolicy = require('./policies/UserControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Incorrect file");
        error.code = "INCORRECT_FILETYPE";
        return cb(error, false)
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
}).single('file');

module.exports = (app) => {

    // LOGIN, REGISTER ROUTES
    app.post('/api/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post('/api/login', AuthenticationController.login)

    //USER ROUTES
    app.get('/api/users', UsersController.index)
    app.get('/api/users/:userId', UsersController.show)
    app.post('/api/users/:userId/upload', upload, UsersController.uploadFile)

    app.use((err, req, res, next) => {
        if (err.code === "INCORRECT_FILETYPE") {
            res.status(422).json({
                error: 'Only images are allowed'
            });
            return;
        }
        if (err.code === "LIMIT_FILE_SIZE") {
            res.status(422).json({
                error: 'File size should be less than 2 MB!'
            });
            return;
        }
    });

    app.put('/api/users/:userId', AuthenticationControllerPolicy.register, UsersController.put)
    app.delete('/api/users/:userId', isAuthenticated, UsersController.delete)

    // LECTURE ROUTES
    app.get('/api/lectures', LecturesController.index)
    app.get('/api/lectures/:lectureId', LecturesController.show)
    app.get('/api/lectures/categories/:categoryId', LecturesController.showCategories)
    app.get('/api/lectures/categories/similar/:categoryId/:lectureId', LecturesController.showSimilar)
    app.get('/api/lectures/categories/other/:categoryId/:lectureId', LecturesController.showDifferent)

    app.put('/api/lectures/:lectureId', LecturesController.put)
    app.post('/api/lectures/:userId', LecturesController.post)
    app.delete('/api/lectures/:lectureId', LecturesController.delete)

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