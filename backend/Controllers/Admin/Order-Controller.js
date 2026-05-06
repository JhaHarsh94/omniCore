const order = require('../../Models/Order.js')


const fetchAllTheOrdersForUsers = async(req,res) => {

    try{

        // get all the orders...
        const getOrders = await order.find({})

        // if no order is not found...
        if(!getOrders.length){
           return res.status(404).json({
                success: false,
                message: 'No order found...'
            })
        }

        
        // successfully fetch the orders...
        res.status(200).json({
            success: true, 
            data: getOrders
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false, 
            message: 'got some error'
        })
    }
}

