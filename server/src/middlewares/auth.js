//require JWT
const jwt = require("jsonwebtoken")

//middleware function to authenticate user using JWT
function login(req, res, next) {
	//store token - request the token from the header and remove spaces
	const token = req.header("x-auth-token")?.trim()
	//log request header for debugging (remove in production)
	//console.log(req.headers)
	//if token not found return error status: deny access 
	if(!token){
		return res.status(401).send("Access Denied! No Token Provided.")
	}

	try{
		//decode and verify token 
		const decoded = jwt.verify(token, process.env.API_PRIVATE_KEY)//using the secret key stored in .env
		console.log("decoded token:", decoded);
		//attach decoded jwt and attach user to the request
		req.user = decoded

		next();//continue to next middleware

	} catch (ex) {
		//if token is invalid or expired, return an error
		res.status(400).send("Invalid Token")
	}
}

//export token to be used in other routes
module.exports = login;