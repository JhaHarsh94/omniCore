const express  = require('express')
const authMiddleWare = require('../../Middleware/auth')
const authorize = require('../../Middleware/authorize')

const router = express.Router()

router.post('/addProduct',authMiddleWare,authorize(['admin']),(req,res)=>{
    res.send('product added')
})


module.exports = router
