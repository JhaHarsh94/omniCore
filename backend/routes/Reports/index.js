const express = require('express')
const { authMiddleWare } = require('../../Middleware/auth')
const authorize = require('../../Middleware/authorize')

const router = express.Router()


router.get('/reports',authMiddleWare,authorize(['manager','admin']), (req,res)=>{
    res.send('get all the report...')
})


module.exports = router
