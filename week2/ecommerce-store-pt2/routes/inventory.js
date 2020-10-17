const express = require("express")  
const inventory = require("../models/inventory.js")
const inventoryRouter = express.Router()
const Inventory = require("../models/inventory.js")    

// Get
inventoryRouter.get("/", (req, res, next) => {
    Inventory.find((err, inventory) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(inventory)
    })
   
})

// Get One
inventoryRouter.get("/:inventoryId", (req, res, next) => {
    Inventory.findById(req.params.inventoryId, (err, inventoryItem) => {
        if (err) {
        res.status(500)
        return next(err)
        }
        return res.status(200).send(inventoryItem) 
    })  
})


// Query
// inventoryRouter.get("/search/genre", (req, res, next) => {
//     Inventory.find({ genre: req.query.genre }, (err, inventory) => {
//         if(err) {
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(inventory)
//     })
// })

// Post
inventoryRouter.post("/", (req, res, next) => {
    const newInventory = new Inventory(req.body)
    newInventory.save((err, saveInventory) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(saveInventory)
    })
})

// Delete
inventoryRouter.delete("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndDelete({ _id: req.params.inventoryId }, (err, deletedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deletedItem.title}`)
    })
})

// Put
inventoryRouter.put("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndUpdate({ _id: req.params.inventoryId}, req.body, { new: true }, (err, updatedInventory) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedInventory)
    })
})

module.exports = inventoryRouter