const express = require('express')
const cors = require ('cors')
const errorHandling = require('./error/errorHandling')
const routes = require('./routes/routes')

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(errorHandling)
app.use(routes)

app.use(function(req, res, next){
    res.status(404).json({
        error: true,
        codigo: 404,
        message: "Endpoint doesnt found"
    })
})

module.exports = app