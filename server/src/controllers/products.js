const Product = require("../models/product")
//const ApiError = require("../utils/ApiError")
//pass next as an arg in function you are going to use the api error


module.exports = {
    //export all logic/functions for all routes to be used

    /*
    Firebase functions
    db.collection("products").get()
    db.collection("products").doc(id).get()
    db.collection("products").add()
    
    */
   
    //POST: create a new product
    //route: api/products
    async postProduct(req,res){
        try{
            //if required field missing, return error msg
            if (!req.body.name || !req.body.sku || !req.body.price) {
                return res.status(400).json({
                    message: "name, sku, and price are required",
                });
            }

            //check duplicate product
            const duplicateProduct = await Product.findOne({
                name: req.body.name
            })
            //send error, if duplicate product entered. conflict with db 
            if(duplicateProduct){
                return res.status(409).send("Product already exists")
            }
            //create new product
            const newProduct = await Product.create({
                image: req.body?.image,
                name: req.body?.name, 
                description: req.body?.description,
                sizes: req.body?.sizes,
                price: req.body?.price,
                stockQuantity: req.body?.stockQuantity,
                status: req.body?.status,
                //connect with authenticate with the user id or id from user table
                userId: req.user.id,
                //category: req.body.categoryId,
            })
            //check it's created: Success msg & show created products
            console.log("Success - Product created", newProduct)
            res.json(newProduct) //respond with user json data created
        }catch(error){
            internalError(error, res)
        }
    },

    //GET: all products
    //route: api/products
    async getAllProducts(req, res){
        try{
            //find all product entries in mongodb
            const products = await Product.find();
            //response success status and return products in JSON data
            res.status(200).json(products);
        } catch(error){
            internalError(error, res)
        }
    },

    //GET: product by id
    //route: api/products/:id
    async getProductById(req,res){
        try{
             //find product to match integer of the params id 
            const foundProduct = await Product.findById(req.params.id); 
            // If product not found return 404 error
            if(!foundProduct){
                return res.status(404).send("Product not found");
            }
            // If found, return user
            res.json(foundProduct);
        }catch(error){
            internalError(error, res)
        }
       
    },

    //GET: by name
    //route: api/products/name
    async getProductByName(req,res){
        try{
            const foundProduct = await Product.findOne({
                name: req.params.name
            })
            //if not found product return error
            if(!foundProduct){
                return res.status(404).send("The product name does not exists")
            }
            res.json(foundProduct)
        }catch(error){
            internalError(error, res)
        }

    },

    //PUT: update product by Id
    //route: /api/products/:id
    async putProduct(req,res){
        try{
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    image: req.body?.image,
                    brand: req.body?.brand,
                    name: req.body?.name,
                    description: req.body?.description,
                    sku: req.body?.sku,
                    price: req.body?.price,
                    stockQuantity: req.body?.stockQuantity,
                    status: req.body?.status,
                    userId: req.user.id
                },
                {
                    new: true
                }
            );

            if (!product) {
                return res.status(404).send("Product not found.");
            }

            res.json(product);
        }catch(error){
            internalError(error, res)
        }
    },

    //DELETE product by id
    //route: /api/products/:id
    //delete product that match the id
    async deleteProduct(req,res){
        try{
            //search product's PK that matches the id
            const product = await Product.findOne(req.params.id);
            if(!product){
                return res.status(404).send("Product id not found.")
            };
            //destroy() method deletes row/instance of the found product id
            await product.deleteOne();
            console.log("Success - Product Deleted: ", product);
            res.json({ message: "Product deleted" });
        } catch(error){
            internalError(error, res);
        }
    }
};


//Reusable error function
function internalError(error, res) {
	console.log(error);
	return res.status(500).send("Internal Error - Please try again later.");
}
