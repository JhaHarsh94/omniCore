const User = require('../Models/User.js')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const userRegistration =  async() =>{
    try{

        const {name,email, password} = req.body
        
        
        const hashPassword =  await bcrypt.hash(password,10)
        
        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        })
        
        await newUser.save()
        
        res.status(201).json({
            success: true,
            message: 'Registration successfully'
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'You got an error'
        })
    }

}