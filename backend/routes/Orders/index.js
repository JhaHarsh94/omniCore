const express = require('express')
const authMiddleWare = require('../../Middleware/auth')
const authorize = require('../../Middleware/authorize')
const { createOrder, fetchAllTheOrdersForUsers, updateTheOrderDetails, deleteTheOrderDetails, fetchSingleOrdersForAdmin } = require('../../Controllers/Admin/Order-Controller')

const router = express.Router()


router.post('/create',authMiddleWare,authorize(['admin','cashier']),createOrder)
router.get('/orders',authMiddleWare,authorize(['admin','cashier']),fetchAllTheOrdersForUsers)
router.get('/getOrderForAdmin/:id', authMiddleWare,authorize(['admin']),fetchSingleOrdersForAdmin)
router.put('/updateOrder/:id',authMiddleWare,authorize(['admin']),updateTheOrderDetails)
router.delete('/deleteOrder/:id',authMiddleWare,authorize(['admin']),deleteTheOrderDetails)



module.exports = router
