require("dotenv").config()
require("./src/config/db");
const express = require("express")
const cors = require('cors')
const policyRoute = require("./src/routes/policy.route")
const messageRoute = require("./src/routes/message.route")

const app = express()
const APP_PORT = 4040 || process.env.APP_PORT


app.use(cors())
app.use(express.json())


app.use('/api/policy', policyRoute);
app.use('/api/message', messageRoute)

app.listen(APP_PORT, ()=> {
    console.log(`server is running on PORT NO ${APP_PORT}`)
})