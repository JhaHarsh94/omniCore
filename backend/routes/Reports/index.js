const express = require('express')
const authorize = require('../../Middleware/authorize')
const authMiddleWare = require('../../Middleware/auth')

const router = express.Router()


router.get('/reports',authMiddleWare,authorize(['manager','admin']), (req,res)=>{
    res.send('get all the report...')
})


module.exports = router
