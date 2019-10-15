const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = {
    checkExistEmail: (req, res, next) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                // 400 Bad request response status code indicates that server cannot or will not process the request due to something that is pereived to be client error
                res.status(400).json({
                    confirmation: 'failure',
                    message: err
                })
            }

            if (user) {
                // 409 Conflict response status code indicates a request conflict with current state of the server
                res.status(409).json({
                    confirmation: 'failure',
                    message: 'Email already taken'
                })
            } else {
                next()

                return
            }
        })
    },
    checkExistUsername: (req, res, next) => {
        User.findOne({ username: req.body.username }, (err, user) => {
            if (err) {
                res.status(400).json({
                    confirmation: 'failure',
                    message: err
                })
            }

            if (user) {
                res.status(409).json({
                    confirmation: 'failure',
                    message: 'Username already taken'
                }) 
            } else {
                next()

                return
            }
        })
    },
    createUser: (req, res) => {
        bcrypt.genSalt(15, (err, salt) => {
            if (err) {
                res.status(400).json({
                    confirmation: 'failure',
                    message: err
                })
            } else {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) {
                        res.status(400).json({
                            confirmation: 'failure',
                            message: err
                        })
                    } else {
                        let newUser = new User({
                            first_name: req.body.firstName,
                            last_name: req.body.lastName,
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                        })

                        newUser.save((err, user) => {
                            if (err) {
                                res.status(400).json({
                                    confirmation: 'failure',
                                    message: err
                                })
                            } else {
                                res.json({
                                    confirmation: 'success',
                                    payload: user
                                })
                            }
                        })
                    }
                })
            }
        })
    }
}