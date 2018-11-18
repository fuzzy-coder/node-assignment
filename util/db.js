const mongoose = require('mongoose')

const DATABASE_URI = process.env.DATABASE_URI || "localhost"
const DATABASE_PORT = process.env.DATABASE_URI || 27017
const DATABASE_NAME = "users"

module.exports = mongoose.connect(`mongodb://${DATABASE_URI}:${DATABASE_PORT}/${DATABASE_NAME}`, { useNewUrlParser: true })