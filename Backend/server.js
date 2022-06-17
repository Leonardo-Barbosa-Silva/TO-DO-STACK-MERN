require('dotenv').config()
require('colors')
const express = require('express')
const connectionDB = require('./Config/db.js')
const app = express()
const port = process.env.PORT || 5000
const routes = require('./Routes/routes.js')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)




app.listen(port, () => { console.log(`Server running on port ${port}...`.cyan) })