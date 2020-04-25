const User = require('../models/User')

exports.createUser = async (req, res) => {

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    await newUser.save((err, response) => {
        if (err) {
            console.next(err)
        }
        res.status(200).json(response)
    })
}

exports.getAllUsers = async (req, res) => {
    await User.find((err, response) => {
        if (err) {
            return next(err)
        }
        res.status(200).json(response)
    }).sort({
        _id: -1
    })
}

exports.getOneUser = async (req, res) => {
    await User.findById(req.params.id, (err, response) => {
        if (err) {
            return next(err)
        }
        res.status(200).json(response)
    })
}

exports.updateUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (err, response) => {
        if (err) {
            console.next(err)
        }
        res.status(200).json(response)
    })
}

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id, (err, response) => {
        if (err) {
            console.next(err)
        }
        res.status(200).json(response)
    })
}