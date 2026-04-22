const express = require('express')
const authMiddleWare = require('../../Middleware/auth')
const authorize = require('../../Middleware/authorize')

const router = express.Router()

router.post('/cashier',authMiddleWare,authorize(['cashier','admin']),(req,res)=>{
    res.send('Welcome to the cashier page...')
})

module.exports = router
