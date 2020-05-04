const {
    User
} = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config')

function jwtSignUser(user) {
    return jwt.sign({
        user,
    }, config.authentication.jwtSecret, {
        expiresIn: '7d'
    })
}

module.exports = {
    async register(req, res) {
        try {
            const user = await User.create(req.body)
            const userJson = user.toJSON()
            res.send({
                user: userJson
            })
        } catch (err) {
            res.status(400).send([`Email is already in use.`])
        }
    },
    async login(req, res) {
        try {

            const {
                email,
                password
            } = req.body
            const user = await User.findOne({
                where: {
                    email: email,
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: `The login information was incorrect`
                })
            }
            if (!(await user.comparePassword(password))) {
                return res.status(403).send({
                    error: `The login information was incorrect`
                })
            }
            const userJson = user.toJSON();
            res.send({
                user: user,
                token: jwtSignUser(userJson)
            })

        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: `An error has occured trying to log in.`
            })
        }
    }
}