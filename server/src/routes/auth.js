//import express
const express = require("express")
//create a new router object to define route endpoint
const router = express.Router()

//import login controller function and handle 
const login  = require("../controllers/auth")

//URL endpoint: http://localhost:4000/api/login
router.post("/", login)

module.exports = router