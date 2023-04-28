const mongoose = require('mongoose');
require('dotenv').config()

const connectionString = process.env.MONGO_DB_URI;


mongoose.connect(connectionString || 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0') 


mongoose.connection.on('connected', () => {
    console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected... `)
})
mongoose.connection.on('error', (error) => {
    console.log('MongoDB connection error', error)
})
// disconnecting from mongoDB
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected ⚡️ ⚡️')
})
