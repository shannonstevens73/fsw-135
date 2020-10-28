const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require('mongoose')
const expressJwt = require("express-jwt")

// Middleware for requests
app.use(express.json())
app.use(morgan("dev"))

// Route
app.use("/auth", require("./routes/authRouter"))
app.use("/api", expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use("/api/user", require("./routes/userRouter"))
app.use("/api/issue", require("./routes/issueRouter"))
app.use("/api/comment", require("./routes/commentRouter"))

// Connect to Database
mongoose.connect('mongodb://localhost:27017/rock-the-vote-part1',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to the DB")
)

// Error handler
app.use((err, req, res, next) => {
    console.log(err)
    if(err.username === "UnarthorizedError"){
    res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

// Set up server
app.listen(8000, () => {
    console.log("The server is running on Port 8000")
}) 