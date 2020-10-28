const express = require ("express")             
const userRouter = express.Router()
const User = require("../models/user")

// Get all users
userRouter.get("/", (req, res, next) => {
    User.find((err, users) => {
        if(err){
            res.status()
            return next(err)
        }
        return res.status(200).send(users)
    })
})

// Get One
userRouter.get("/:userId", (req, res, next) => {
    User.findById(req.params.userId, (err, userItem) => {
        if (err) {
        res.status(500)
        return next(err)
        }
        return res.status(200).send(userItem) 
    })  
})

// // Get user(s) by search term
// // localhost:8000/users/search?user=o
// userRouter.get("/search", (req, res, next) => {
//     const userRouter { user } = req.query
//     const pattern = new RegExp(user)
//     User.find({ name: { $regex: pattern, $options: 'i' } }, (err, users) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(users)
//     })
// })

// Add new user
userRouter.post("/", (req, res, next) => {
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedUser)
    })
})

// Delete
userRouter.delete("/:userId", (req, res, next) => {
    User.findOneAndDelete(
        { _id: req.params.userId },
        (err, deletedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted username: ${deletedUser.username}`)
        }
    )
})

// Update
userRouter.put("/:userId", (req, res, next) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true },
        (err, updatedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedUser)
        }
    )
})

module.exports = userRouter