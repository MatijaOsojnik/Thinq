const {
    User,
    Lecture,
    Category,
    Role
} = require('../models')

const {
    Op
} = require("sequelize");

module.exports = {
    async count(req, res) {
        try {
            const users = await User.findAndCountAll({
                limit: 5
            });
            const lectures = await Lecture.findAndCountAll({
                limit: 5
            });
            const categories = await Category.findAndCountAll({
                limit: 5
            });
            const roles = await Role.findAndCountAll({
            });
            res.send({
                users: users,
                lectures: lectures,
                categories: categories,
                roles: roles
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch lectures`
            })
        }
    },
}