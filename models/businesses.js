// ************
// Dependencies
// ************
const mongoose = require('mongoose')

// Mongoose Schema Variable
const Schema = mongoose.Schema

// Create Schema
const businessSchema = new Schema ({
    name: {type: String, required: true},
    location: String,
    owners: {type: String, required: true},
    type: String,
    phone: String,
    email: String,
    website: String,
    image: String,
    tags: String
}, {timestamps: true})

// Create model
const Business = mongoose.model('Business', businessSchema)

module.exports = Business