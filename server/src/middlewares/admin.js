//middleware function to check the user is admin
//runs after auth middleware
function admin(req, res, next) {
    //req.user comes from the auth middleware
    //check the user has admin privileges
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).send("Access denied")//return error if not admin
    }
    next();//continue to next middleware
}

//export middleware to be used in protected admin routes
module.exports = admin;