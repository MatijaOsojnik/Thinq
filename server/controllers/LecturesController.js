const {
    Lecture,
    Category,
    LectureUsers,
} = require('../models')

const {
    Op
} = require("sequelize");

module.exports = {
    async index(req, res) {
        try {
            const lectures = await Lecture.findAll({
                include: [{
                    model: Category,
                    required: true
                }]
            })
            res.send(lectures)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch lectures`
            })
        }
    },
    async post(req, res) {
        try {
            const userId = req.body.user_id;
            const lecture = await Lecture.create(req.body)
            await LectureUsers.create({
                UserId: userId,
                LectureId: lecture.id
            })
            res.send(lecture)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying to create lecture`
            })
        }
    },
    async show(req, res) {
        try {
            const lecture = await Lecture.findByPk(req.params.lectureId)
            res.send(lecture)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying fetch a lecture`
            })
        }
    },
    async showSimilar(req, res) {
        try {
            console.log(req.params.lectureId)
            const lectures = await Lecture.findAll({
                where: {
                    [Op.and]: [{
                            category_id: req.params.categoryId
                        },
                        {
                            id: {
                                [Op.ne]: req.params.lectureId
                            }
                        }
                    ],
                }
            })
            console.log(lectures)
            res.send(lectures)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch lectures`
            })
        }
    },
        async showDifferent(req, res) {
            try {
                console.log(req.params.lectureId)
                const lectures = await Lecture.findAll({
                    where: {
                                id: {
                                    [Op.ne]: req.params.lectureId
                                }
                    },
                    order: [
                        ['title', 'ASC']
                    ]
                })
                console.log(lectures)
                res.send(lectures)
            } catch (error) {
                console.log(error)
                res.status(500).send({
                    error: `An error has occured trying to fetch lectures`
                })
            }
        },
    async put(req, res) {
        try {
            const lecture = await Lecture.update(req.body, {
                where: {
                    id: req.params.lectureId
                }
            })
            res.send(req.body)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying fetch a lecture`
            })
        }
    }
}