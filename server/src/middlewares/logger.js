function logger(req, res, next){
    //log the path and request method to the console
    console.log(req.path, req.method) 
    //move on to the next middleware
    next() 
}

module.exports = logger