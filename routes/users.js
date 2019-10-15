const express = require('express');
const router = express.Router();	
const bcrypt = require('bcryptjs')


let User = require('../models/User')	



/* GET users listing. */	
let signupController = require('../controllers/signupController')
// TODO	let userController   = require('../controllers/userController')

router.get('/', function(req, res, next) {	router.get('/', function(req, res, next) {
    res.send('respond with a resource');	    userController.findAllUsers({}, (err, users) => {
        if (err) {
            res.status(400).json({
                confirmation: 'failure',
                message: err
            })
        } else {
            res.json({
                confirmation: 'success',
                payload: users
            })
        }
    })
});	});


router.post('/register', 

            signupController.checkExistEmail, 	             signupController.checkExistUsername, 
                    signupController.createUser)
router.get('/register', (req, res) => {	router.get('/register', (req, res) => {
            res.render('register', { error_msg: false, success_msg: false })	    
                res.render('register', { error_msg: false, success_msg: false })
    })	
})
router.get('/register', (req, res) => {	router.get('/register', (req, res) => {
    res.render('register', { error_msg: false, success_msg: false })	 

res.render('register', { error_msg: false, success_msg: false })
})	})


router.get('/login', (req, res) => {
    res.render('login', { success_msg: false, error_msg: false })
})

router.post('/login', (req, res) => {
    // 1. find user in MongoDB using email
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.status(400).json({
                confirmation: 'failure',
                message: err
            })
        }

        if (user) {
            // 2. use bcrypt.compare to compare password from login form and user.password
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    res.status(400).json({
                        confirmation: 'failure',
                        message: err
                    })
                }

                if (result) {
                    res.render('login', {success_msg: 'User logged in!', error_msg: false})
                } else {
                    res.render('login', {success_msg: false, error_msg: 'Passwords do not match'})
                }
            })

        } else {
            res.status(400).json({
                confirmation: 'failure',
                message: 'There is no such user'
            })
        }
    })
})

router.put('/updateuserbyid/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
        if (err) {
            res.status(400).json({
                confirmation: 'failure',
                message: err
            })            
        } else {
            res.json({
                confirmation: 'success',
                payload: updatedUser
            })
        }
    })
})
router.delete('/deleteuserbyid/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
        if (err) {
            res.status(400).json({
                confirmation: 'failure',
                message: err
            })
        } else {
            res.json({
                confirmation: 'success',
                payload: deletedUser
            })
        }
    })
})
// localhost:3000/users/updateuserbyid/5d9caab468ca780b82c5a298

module.exports = router;	