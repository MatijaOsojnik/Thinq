const {
    User
} = require('../models')

const {
    Op
} = require("sequelize");

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
    }
}