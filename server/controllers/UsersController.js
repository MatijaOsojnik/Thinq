const {
    User
} = require('../models')

const fs = require('fs')

const sharp = require('sharp')

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

// const {
//     Op
// } = require("sequelize");

module.exports = {
    async index(req, res) {
        try {
            const users = await User.findAll({})
            res.send(users)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch users`
            })
        }
    },
    async show(req, res) {
        try {
            const user = await User.findByPk(req.params.userId,
                //     {
                //     attributes: {
                //         exclude: ['password']
                //     }
                // }
            )
            res.send(user)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying fetch a user`
            })
        }
    },
    async put(req, res) {
        try {
            const user = await User.findByPk(req.params.userId)
            user.update(req.body, {
                returning: true,
                plain: true,
            })

            //  const user = await User.update(req.body, {
            //      where: {
            //          id: req.params.userId
            //      },
            //      returning: true,
            //      individualHooks: true
            //  })
            res.send(req.body)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying update user`
            })
        }
    },
    async delete(req, res) {
        try {
            const user = await User.destroy({
                where: {
                    id: req.params.userId
                },
            })
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying to delete user`
            })
        }
    },
    async uploadFile(req, res) {
        try {
            await sharp(req.file.path)
                .resize(128, 128)
                .jpeg({
                    quality: 80
                })
                .toFile(`./static/${req.file.originalname}`)

                let url = ``

                if(process.env.NODE_ENV === 'production') {
                    url = `https://thinq-language-learning.herokuapp.com/static/${req.file.originalname}`
                } else {
                    url = `http://localhost:8082/static/${req.file.originalname}`
                }

            const user = await User.findByPk(req.params.userId)
            user.update({
                icon_url: url
            })

            fs.unlink(req.file.path, () => {
                res.json({
                    file: `/static/${req.file.originalname}`
                })
            })

        } catch (error) {
                res.send({
                    err: error
                })
        }
    }
}