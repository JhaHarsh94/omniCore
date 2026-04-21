const express = require('express')
const { userRegistration, login, authMiddleWare } = require('../../Controllers/authController')


const router  = express.Router()

router.post('/register',userRegistration)
router.post('/login',login)
router.get('/check-auth',authMiddleWare)