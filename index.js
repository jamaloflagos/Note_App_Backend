require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const http = require("http")
// const { dbConnection } = require("./db")
const cors = require("cors")
const { userRouter } = require("./routes/userRouter")
const { noteRouter } = require("./routes/noteRouter")
// const { initSocket } = require("./socket")



const app = express()
const port = process.env.PORT
const server = http.createServer(app)

 
// Socket setup
// initSocket(server)

const corsOptions = {
    origin: 'https://note-app-three-sage.vercel.app',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Add the allowed HTTP methods for your frontend
  };

// Middlewares
app.use(express.json())
app.use(cors(corsOptions))

app.use("/user", userRouter)
app.use("/note", noteRouter)

try {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        server.listen(process.env.PORT, () => console.log(`connected to databse and listening on port ${process.env.PORT}`))
})
} catch(err) {
    console.log(err)
}


// server.listen(port, async() => {
// //     try {
// //         await dbConnection
// //         console.log("database connected");
        
// //     } catch (error) {
// //         console.log(error);
        
// //     }
    
// //     console.log(`server is running on port ${port}`);
// // });



