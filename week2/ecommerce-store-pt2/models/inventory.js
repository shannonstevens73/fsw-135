const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Inventory Blueprint
const inventorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("InventoryModel", inventorySchema)