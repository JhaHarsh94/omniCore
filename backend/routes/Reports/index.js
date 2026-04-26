const express = require('express')
const authorize = require('../../Middleware/authorize')
const authMiddleWare = require('../../Middleware/auth')

const router = express.Router()


router.get('/getTheReports',authMiddleWare,authorize(['manager','admin']), (req,res)=>{
    res.send('Welcome to the manager page, get all the reports from here...')
})


module.exports = router
