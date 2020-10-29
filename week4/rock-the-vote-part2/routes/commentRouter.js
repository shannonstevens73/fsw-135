const express = require ("express")             
const commentRouter = express.Router()
const Comment = require("../models/comment")

// Get all comments
commentRouter.get("/", (req, res, next) => {
    Comment.find((err, comments) => {
        if(err){
            res.status()
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// Get One
commentRouter.get("/:commentId", (req, res, next) => {
    Comment.findById(req.params.commentId, (err, commentItem) => {
        if (err) {
        res.status(500)
        return next(err)
        }
        return res.status(200).send(commentItem) 
    })  
})

// Get by User
commentRouter.get("/:userID", (req, res, next) => {
    Comment.find({ user: req.params.userID }, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// Add new comment
commentRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

// Increase Like count
commentRouter.put("/like/:commentID", (req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentID },
        { $inc: { likes: 1 }},
        { new: true },
        (err, updatedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        }
    )
})

// Delete
commentRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete(
        { _id: req.params.commentId },
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted user: ${deletedComment.title}`)
        }
    )
})

// Update
commentRouter.put("/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        req.body,
        { new: true },
        (err, updatedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        }
    )
})

module.exports = commentRouter