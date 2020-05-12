const {
    Role
} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const roles = await Role.findAll({
                where: {}
            })
            console.log(roles)
            res.send(roles)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch roles`
            })
        }
    },
    async create(req, res) {
        try {
            const role = await Role.create(req.body)
            res.send(role)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying to create role`
            })
        }
    }
}