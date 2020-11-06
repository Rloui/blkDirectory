// ************************************************
// Dependencies
// ************************************************
const express = require('express')
const Business = require('../models/businesses')
const businessSeed = require('../models/businessSeed.js')
const methodOverride = require('method-override')

// ************************************************
// Globl Configuration
// ************************************************
const router = express.Router()

// ************************************************
// Middleware
// ************************************************

// Method Override
router.use(methodOverride('_method'))

// Body Parser
router.use(express.urlencoded({ extended: false }))
router.use(express.json())

// ************************************************
// Routes
// ************************************************

// Index Route
router.get('/', (req, res) => {
    Business.find({}, (err, allBusinesses) => {
        res.render('index.ejs', {
            business: allBusinesses
        })
    })
}) 

// Seed Route
router.get('/seed', (req, res) => {
    Business.create( businessSeed, (err, dataCreated)=>{
        console.log(dataCreated)
        res.redirect('/blk');
    })
});

// New Route
router.get('/new/', (req, res) => {
    res.render('new.ejs')
})

// Create Route
router.post('/', (req, res) => {
    Business.create(req.body, (err, createdBusiness) => {
        if (err) console.log(err.message)
        console.log('created ' + createdBusiness)
        res.redirect('/blk/')
    })
})

// Edit Route
router.get('/:id/edit', (req, res) => {
    Business.findById(req.params.id, (err, foundBusiness) => {
        if (err) console.log(err.message)
        console.log('found business ' + foundBusiness)
        res.render('edit.ejs', {
            selectBusiness: foundBusiness
        })
    })
})

// Update Route
router.put('/:id', (req, res) => {
    console.log(req.body)
    Business.findByIdAndUpdate(req.params.id, req.body,{new: true}, (err, updatedBusiness) => {
        if (err) console.log(err.message)
        console.log('updated Business '+ updatedBusiness)
        res.redirect('/blk/')
    })
})

// Delete Route
router.delete('/:id', (req, res) => {
    Business.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err, deletedObject) => {
        if (err) console.log(err.message)
        console.log('Deleted Object ' + deletedObject)
        res.redirect('/blk/')
    })
})

// Show Route
router.get('/:id', (req, res) => {
    Business.findById(req.params.id, (err, foundBusiness) => {
        if (err) console.log(err.message)
        console.log('Found Business ' + foundBusiness)
        res.render('show.ejs', {
            selectBusiness: foundBusiness
        })
    })
})

module.exports = router