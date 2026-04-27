import React from 'react'

const products = require('../../Models/Product.js')

const getAllTheProducts = async(req,res) => {

    try{

        
        const {id} = req.params
        
        const getProduct = await products.findById(id)
        
        if(!getProduct){
            res.status(404).json({
                success: false,
                message: 'No product found',
                
            })
        }
        
        return res.status(200).json({
            success: true,
            data: getProduct
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: `Your error is${err}`
        })
    }

}


module.exports = getAllTheProducts