import app from './app.js';
import connectionToDB from './config/dbConnection.js';

const PORT = process.env.PORT || 5000

app.listen(PORT, async ()=>{
    console.log(`Server is up and Running at localhost:${PORT}`)
    await connectionToDB()
})

