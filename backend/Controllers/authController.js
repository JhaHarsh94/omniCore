const User = require('../Models/User.js')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const userRegistration =  async(req,res) =>{
    try{

        const {name,email, password} = req.body // first get the name, email and password...
        
        
        const hashPassword =  await bcrypt.hash(password,10) // now hash that password...
        
        // create the new user and change the password with hashpassword
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


const login = (req,res) =>{
    const {email,password} = req.body // first get the email and password
    try{
        const checkTheUser = User.findOne({email}) // now check the user has registered with the same email or not...


        // if the user did not register
        if(!checkTheUser){
            return  res.json({
                success: false,
                message: 'User is not registered...Please register yourself first'
            })
        }

        // now compare the password with the password you entered
        const matchThePassword = bcrypt.compare(password,checkTheUser.password)

        // if password did not match 
        if(!matchThePassword){
            return res.json({
                success: false,
                message: 'Invalid Pasword...'
            })
        }


        // now create the token using jwt
        const token = jwt.sign({
            id: checkTheUser?._id,
            role: checkTheUser?.role,
        },
        process.env.Secret_key,
        {expiresIn: "60m"}
    )
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Got some error'
        })
    }
}

const authMiddleWare = (req,res,next) => {
    

}