
const router = require('express').Router()
const {message} = require("../controllers/message.controller")




router.post('/message-scheduler',message)

module.exports = router