const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    cartId: String, 
    cartItems:[
        {
            productId: {
                type: String,
                ref: 'Products',
                required: true,
            },
            title: String,
            image: String,
            price: Number,
            salePrice: Number,
            quantity: {
                type: Number, 
                required: true
            },
        }
    ],
    addressDetails: 
        {
            addressId: String,
            name:String,
            phoneNo: Number,
            Country: String,
            pincode: Number,
            city: String,
            address: String,


        },
    orderStatus: {type: String, default: 'pending'},
    paymentMethod: {type: String, required: true},
    paymentStatus: {type: String, default: 'pending'},
    payerId: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,



})


module.exports = mongoose.model('Orders',orderSchema)