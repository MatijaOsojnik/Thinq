const {
    User
} = require('../models')

const fs = require('fs')

const sharp = require('sharp')

const bcrypt = require('bcrypt')

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
            const user = await User.findByPk(req.params.userId)
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
            if (user.email !== req.body.email) {
                await user.update(req.body, {
                    returning: true,
                    plain: true,
                })
                .then(() => res.send(req.body))
                .catch(err => {
                    res.status(400).send([`Email is already in use`])
                })
            } else {
                res.status(400).send([`Use a different email.`])
            }
        } catch (err) {
            res.status(400).send([`Email is already in use`])
            res.status(500).send([
                `An error has occured trying update user`
            ])
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

            if (process.env.NODE_ENV === 'production') {
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