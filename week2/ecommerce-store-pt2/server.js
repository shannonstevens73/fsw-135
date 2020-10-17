const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require('mongoose')

// Middleware for requests
app.use(express.json())
app.use(morgan("dev"))

// Route
app.use("/inventory", require("./routes/inventory.js"))

// Connect to Database
mongoose.connect('mongodb://localhost:27017/e-commerce-store',
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