const express  = require('express')
const authMiddleWare = require('../../Middleware/auth')
const authorize = require('../../Middleware/authorize')
const { getTheProducts, addProduct, updateTheProducts, deleteTheProducts, getSingleProduct, addImage } = require('../../Controllers/Admin/Product-controller')
const { upload } = require('../../helpers/cloudinary')


const router = express.Router()

router.post('/upload-image',authMiddleWare,authorize(['admin']),upload.single('image'),addImage)

router.post('/add',authMiddleWare,authorize(['admin']),upload.single('image'),addProduct)
router.get('/',getTheProducts)
router.get('/:id',getSingleProduct)
router.put('/:id',authMiddleWare,authorize(['admin']),updateTheProducts)
router.delete('/:id',authMiddleWare,authorize(['admin']),deleteTheProducts)


module.exports = router
