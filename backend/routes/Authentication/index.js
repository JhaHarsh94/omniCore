const express = require('express')
const { userRegistration, login } = require('../../Controllers/Authentication/authController.js')
const authMiddleWare = require('../../Middleware/auth.js')


const router  = express.Router()

router.post('/register',userRegistration)
router.post('/login',login)
router.get('/check-auth',authMiddleWare,(req,res)=>{
    res.json({
        success: true,
        user: req.user
    })
})


module.exports = router