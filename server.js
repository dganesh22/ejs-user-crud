const express = require('express')
require('dotenv').config() // config settings to access the variables of .env file

const connectDb = require('./db/connect')

const cors = require('cors') // cross origin resource sharing (to avoid CORS Effect)

const PORT = process.env.PORT

const app = express()

// view folder static
app.use(express.static('./view'))

//template engine settings
app.set('view engine', 'ejs')
app.set('views', './view')

// middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

// index route
app.use(`/`, require('./route/user_route'))


// server call
app.listen(PORT, () => {
    connectDb()
    console.log(`server is started @ http://localhost:${PORT}`)
})