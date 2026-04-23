const mongoose = require('mongoose')

const connectDB =async=>{
    mongoose.connect(process.env.MongodbUrl).then(()=>console.log('Database is connected...')).catch(()=>console.log('something wrong with connecting your database'))
} 


export default connectDB