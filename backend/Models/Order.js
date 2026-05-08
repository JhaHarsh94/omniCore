const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartId: String, 
    cartItems: {    
        type: [
            {
                productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true},
                title: String,
                price: Number,
                image: String,
                quantity: {type: Number, required: true},
            },
        ],
        required: true
    },
    addressDetails: 
        {
            addressId: String,
            name:String,
            phoneNo: Number,
            country: String,
            pincode: String,
            city: String,
            address: String,


        },
     orderType: {type: String, enum: ['POS','ONLINE'], default: 'POS'},   
    orderStatus: {type: String, default: 'pending'},
    paymentMethod: {type: String, enum: ['upi','card', 'cash'], required: true},
    paymentStatus: {type: String, default: 'pending'},
    payerId: String,
    paymentId: String,
    totalAmount: {type: Number, required: true},
},
 {timestamps: true}
)


module.exports = mongoose.model('Orders',orderSchema)