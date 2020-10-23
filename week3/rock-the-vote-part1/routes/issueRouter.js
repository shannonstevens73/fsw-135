const express = require ("express")             
const issueRouter = express.Router()
const Issue = require("../models/issue")

// Get all issues
issueRouter.get("/", (req, res, next) => {
    Issue.find((err, issues) => {
        if(err){
            res.status()
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

// Get One
issueRouter.get("/:issueId", (req, res, next) => {
    Issue.findById(req.params.inventoryId, (err, issueItem) => {
        if (err) {
        res.status(500)
        return next(err)
        }
        return res.status(200).send(issueItem) 
    })  
})

// Get by User
issueRouter.get("/:userID", (req, res, next) => {
    Issue.find({ user: req.params.userID }, (err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

// Add new issue
issueRouter.post("/:userID", (req, res, next) => {
    req.body.user = req.params.userID
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

issueRouter.put("/like/:issueID", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueID },
        { $inc: { likes: 1 }},
        { new: true },
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

// find issues by like range
// localhost:8000/issues/search/bylikes in Postman
issueRouter.get("/search/bylikes", (req, res, next) => {
    Issue.where("likes").gte(5).exec((err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

// Delete
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete(
        { _id: req.params.issueId },
        (err, deletedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted user: ${deletedIssue.title}`)
        }
    )
})

// Update
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        req.body,
        { new: true },
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

module.exports = issueRouter