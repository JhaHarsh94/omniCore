const dotenv = require('dotenv')
const express = require('express')
dotenv.config()
const connectDB = require('./config/mongodb.js')

const authRoute = require('./routes/Authentication/index.js')
const managerReportRouter = require('./routes/Reports/index.js')
const cashierOrdersRouter = require('./routes/Orders/index.js')
const adminProductsRouter = require('./routes/Admin/index.js')

const app = express()
const PORT = process.env.PORTNO || 7000
connectDB()

app.use(express.json()) // middleware
app.use('/api/auth',authRoute)
app.use('/api/admin/products',adminProductsRouter)
app.use('/api/cashier/orders',cashierOrdersRouter)
app.use('/api/manager/reports',managerReportRouter)


app.listen(PORT,()=>{
    console.log(`Your Server is running on Port No ${PORT}`)
})