const express = require('express')

const app = express()


const PORT = process.env.PORTNO



app.use(express.json())

app.use()



app.listen(PORT,()=>{
    console.log(`Your Server is running on Port No ${PORT}`)
})