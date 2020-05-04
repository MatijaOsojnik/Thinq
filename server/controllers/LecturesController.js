const {
    Lecture,
    Category
} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const lectures = await Lecture.findAll({
                where: {},
                include: Category
            })
            res.send(lectures)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch lectures`
            })
        }
    },
    async create(req, res) {
        try {
            const lecture = await Lecture.create(req.body)
            res.send(lecture)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying to create lecture`
            })
        }
    }
}