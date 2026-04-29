import React from 'react'

const products = require('../../Models/Product.js')


const  addProduct = async(req,res) => {

    try{

        
        const {title, image, description, category, price, salePrice, totalStock} = req.body
        
        const newProduct = new products({
            title,
            image,
            description,
            category,
            price,
            salePrice,
            totalStock,
        })
        
        await newProduct.save()
        
        res.status(201).json({
            success: true,
            data: newProduct,
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'got some error...'
        })
    }







}


const getTheProducts = async(req,res) => {
    try{

        const productList = await products.find({})
        
        res.status(200).json({
            success: true,
            data: productList,
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'got some error...'
        })
    }
}


const updateTheProducts = async(req,res) =>{
    try{
        const {id}  = req.params
        const {title, image, description, category, price, salePrice, totalStock} = req.body

        const findProductAndUpdate = await products.findById(id)

        if(!findProductAndUpdate){
            res.status(400).json({
                success: false, 
                message: 'No products found...'

            })
        }


       findProductAndUpdate.title = title || findProductAndUpdate.title
       findProductAndUpdate.image = image || findProductAndUpdate.image
       findProductAndUpdate.description = description || findProductAndUpdate.description
       findProductAndUpdate.category = category || findProductAndUpdate.category
       findProductAndUpdate.price = price || findProductAndUpdate.price
       findProductAndUpdate.salePrice = salePrice || findProductAndUpdate.salePrice
       findProductAndUpdate.totalStock = totalStock || findProductAndUpdate.totalStock

       findProductAndUpdate.save()

       res.status(200).json({
        success: true,
        data: findProductAndUpdate
       })        

    }
    catch(err){
        res.status(500).json({
            success: false, 
            message: 'got some error...'
        })
    }
}


const deleteTheProducts = async(req,res) => {
    try{
        const {id} = req.params
        const deleteProducts = await products.findByIdAndDelete(id)

        if(!deleteProducts){
            res.status(400).json({
                success: false,
                message: 'Product not found'
            })
        }

        res.status(200).json({
            success: true, 
            message: 'Product deleted successfully...'
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
             message: 'got some error...'
        })
    }
}


module.exports = {addProduct,getTheProducts,updateTheProducts,deleteTheProducts}


