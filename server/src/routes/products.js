const express = require("express")
//create instance of router
const router = express.Router()

const auth = require("../middlewares/auth")
const admin = require("../middlewares/admin");

//require the CRUD operations from the controller
const productsController = require("../controllers/products")

//DEFINE ENDPOINTS: URL routes in an API
//POST: create a new product
//admin only access
router.post("/", [auth, admin], productsController.postProduct)

// GET: all products
router.get("/", productsController.getAllProducts)

// GET: product by name
router.get("/name/:name", productsController.getProductByName)

//GET: product by id
router.get("/:id", productsController.getProductById)

//PUT: update product by Id
//admin only access
router.put("/:id", [auth, admin], productsController.putProduct)

//DELETE product by id
//admin only access
router.delete("/:id", [auth, admin], productsController.deleteProduct)

module.exports = router
//require in index.js
