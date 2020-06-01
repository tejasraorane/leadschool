const express = require('express'),
    { addUser, authenticate } = require('./auth.controller'),
    router = express.Router()

router.post('/create', addUser)

router.post('/authenticate', authenticate)

module.exports = router
