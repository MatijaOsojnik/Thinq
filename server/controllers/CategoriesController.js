const {
    Category
} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const categories = await Category.findAll({
                where: {}
            })
            res.send(categories)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying to fetch categories`
            })
        }
    },
    async create(req, res) {
        try {
            const category = await Category.create(req.body)
            res.send(category)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying to create category`
            })
        }
    }
}