const express = require('express')

const app = express()
const managerRoute = require('./routes/Manager/index.js')
const cashierRoute = require('./routes/Cashier/index.js')


const PORT = process.env.PORTNO

const dotenv = require('dotenv')
dotenv.config()


app.use(express.json())
app.use('api/manager',managerRoute)





app.listen(PORT,()=>{
    console.log(`Your Server is running on Port No ${PORT}`)
})