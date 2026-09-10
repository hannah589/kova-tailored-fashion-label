// import bcrypt library to hash and compare password securely
const bcrypt = require("bcrypt")

// import User model to interact with Users table in the database
const { User } = require("../models/user")

// login controller function
// async is used because database + bcrypt operations take time
async function login(req, res) {
    try{
        // check if email and password are missing from request body
        if(!req.body.email && !req.body.password){

            //if missing, return 400 = bad request response(user input problem)
            return res.status(400).json({
                message: "Email and password required"
            });
        }

        // search database for ONE user
        // where email and username match values sent in request
        // await pauses execution until database responds
        const user = await User.findOne({

            // SQL equivalent:
            // SELECT * FROM Users WHERE email = ? AND username = ? 
            //LIMIT 1
            where: {
                email: req.body?.email,
                username: req.body?.username 
            }
        })
        //if no user, send 
        if(!user){
            console.log("Invalid username or email")
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // compare entered password with hashed password stored in database
        // req.body.password = plain text password user typed
        // user.password = hashed password stored in DB
        // bcrypt.compare returns true or false
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )

        // if password comparison fails
        if(!validPassword){

            //log invalid password attempt
            console.log("Invalid password")

            //return generic auth error
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        //generate JWT token for authenticated user
        //method usually defined inside User model
        const token = user.generateAuthToken()

        //send token back to frontend/client
        //frontend stores token for future authenticated requests
        return res.json({ token });

    } catch (error) {

        //log unexpected server error in terminal
        console.log(error)

        //send server error response
        //500 = internal server error
        res.status(500).json({
            message: "Server Error"
        })
    }
}

//export login function so routes can use it
module.exports = login


/*
Example usage in routes:

const login = require("../controllers/login")

router.post("/login", login)

Client request example:

POST /login
{
   "email": "test@gmail.com",
   "password": "mypassword123"
}

Success response:

{
   "token": "eyJhbGcOiJIUzI1NiIs..."
}
*/