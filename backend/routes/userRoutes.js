const express = require('express')
const { register, login, rating } = require('../handlers/user')
const { isAuth } = require('../middelwares/isAuth')

const UserRoute = express.Router()

UserRoute.post('/register',register)
UserRoute.post('/login',login)

//user rate a food
UserRoute.put('/rate',isAuth,rating)


module.exports = UserRoute