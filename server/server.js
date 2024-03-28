import app from './app.js';
import connectionToDB from './config/dbConnection.js';
import cloudinary from 'cloudinary'

const PORT = process.env.PORT || 5000

//Cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

app.listen(PORT, async ()=>{
    console.log(`Server is up and Running at localhost:${PORT}`)
    await connectionToDB()
})

