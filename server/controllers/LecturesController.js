const {
    Lecture,
    Category,
    User
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
                }, {
                    model: User,
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
            const lecture = await Lecture.create(req.body).
            then((lecture) => {
                if (req.params.userId) {
                    User.findByPk(req.params.userId).then((user) => {
                        lecture.setUsers(user)
                    }).catch((err) => {
                        res.send({
                            err: err
                        })
                    })
                }
            })
            // lecture.setUsers
            // await LectureUsers.create({
            //     UserId: userId,
            //     LectureId: lecture.id
            // })
            res.send(lecture)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to create lecture`
            })
        }
    },
    async show(req, res) {
        try {
            const lecture = await Lecture.findByPk(req.params.lectureId, {
                include: [
                    User
                ]
            })
            res.send(lecture)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying fetch a lecture`
            })
        }
    },
    async user(req, res) {
        try {
            const lectures = await Lecture.findAll({
                include: [{
                    model: User,
                    where: {
                        id: req.params.userId
                    }
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
                },
                include: [{
                    model: User
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
    async showDifferent(req, res) {
        try {
            const lectures = await Lecture.findAll({
                where: {
                    id: {
                        [Op.ne]: req.params.lectureId
                    }
                },
                order: [
                    ['title', 'ASC']
                ],
                include: [{
                    model: User
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
    async showCategories(req, res) {
        try {
            const lectures = await Lecture.findAll({
                where: {
                    category_id: req.params.categoryId
                },
                include: [{
                    model: Category,
                    required: true
                }, {
                    model: User,
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
    async put(req, res) {
        try {
            await Lecture.update(req.body, {
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
    },
    async delete(req, res) {
        try {
            const lecture = await Lecture.destroy({
                where: {
                    id: req.params.lectureId
                }
            })
            res.send('Successful lecture delete')
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying fetch a lecture`
            })
        }
    }
}