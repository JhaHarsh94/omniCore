const cloudinary = require('cloudinary').v2
const multer = require('multer')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
})


const storage =  new multer.memoryStorage() // now use the multer to store the image

// create the async function to upload the image
async function ImageUpload(file){
   return new Promise((resolve,reject)=>{
    const uploadStream = cloudinary.uploader.upload_stream(
        {resource_type: 'auto', folder: 'products'},
        (error, result) =>{
            if(error) return reject(error)
                resolve(result)

        }
    )
    uploadStream.end(file)
   }
)
}


const upload = multer({storage})

// console.log(console.log("API KEY:", process.env.CLOUDINARY_API_KEY))


module.exports = {upload,ImageUpload}