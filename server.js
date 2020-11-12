// ************
// Dependencies
// ************
const express = require('express')
const mongoose = require('mongoose')
const businessController = require('./controllers/router.js')
const app = express()

// ************
// Port
// ************
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000

// ************
// Middleware
// ************

// Use Controller
app.use('/blk', businessController)

app.use(express.static('public'))


// ************
// Globl Configuration ENV
// ************
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'business'
const db = mongoose.connection

// Connect to Mongo 
mongoose.connect(
	MONGODB_URI, {
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true
	}, () => {
		console.log('the connection with mongod is established')
	}
)

// open the connection to mongo
db.on('open' , ()=>{})

// Connection Error/Success
// Define callback functions for various events
db.on('error', (err) => console.log(err.message + ' is mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))


// Server PORT
app.listen(PORT, () => {
    console.log('BLK Server is listening ' + PORT)
})