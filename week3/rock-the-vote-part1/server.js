const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require('mongoose')

// new algorithm for authRouter
// secret: secret,
// algorithms: ['RS256']

// Middleware for requests
app.use(express.json())
app.use(morgan("dev"))

// Route
app.use("/user", require("./routes/userRouter"))
app.use("/issue", require("./routes/issueRouter"))
app.use("/comment", require("./routes/commentRouter"))

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
    return res.send({errMsg: err.message})
})

// Set up server
app.listen(8000, () => {
    console.log("The server is running on Port 8000")
}) 