const express  = require('express')
const authMiddleWare = require('../../Middleware/auth')
const authorize = require('../../Middleware/authorize')
const { getTheProducts, addProduct, updateTheProducts, deleteTheProducts, getSingleProduct } = require('../../Controllers/Admin/Product-controller')


const router = express.Router()

router.post('/',authMiddleWare,authorize(['admin']),addProduct)
router.get('/',getTheProducts)
router.get('/:id',getSingleProduct)
router.put('/:id',authMiddleWare,authorize(['admin']),updateTheProducts)
router.delete('/:id',authMiddleWare,authorize(['admin']),deleteTheProducts)


module.exports = router
