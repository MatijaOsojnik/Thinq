const {
    User
} = require('../models')

const fs = require('fs')

const sharp = require('sharp')

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
                console.log(req.body.phone_num)
                console.log(req.body.birth_date)
                const user = await User.findByPk(req.params.userId)
                if (user.email !== req.body.email) {
                    if (req.body.password && req.body.repeat_password) {
                        await user.update({
                            password: req.body.password,
                            repeat_password: req.body.repeat_password
                        }, {
                            returning: true,
                            plain: true,
                        })
                    } else if (req.body.phone_num || req.body.display_name || req.body.birth_date) {
                        await user.update({
                                display_name: req.body.display_name,
                                phone_num: req.body.phone_num,
                                birth_date: req.body.birth_date
                            })
                        }
                        else if(req.body.email) {
                            await user.update({
                                email: req.body.email,
                            }, {
                                returning: true,
                                plain: true,
                            })
                        }

                    } else {
                        res.status(400).send([`Use a different email.`])
                    }
                    res.send(req.body)
                } catch (err) {
                    res.status(400).send([`Email is already in use.`])
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