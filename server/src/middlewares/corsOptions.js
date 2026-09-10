//helps secure node/express apps by allowing or blocking cross origin HTTP requests.
//origins: the source of a request
// Only permitted origins can access the API

const corsOptions = {
  //specifies which frontend origins are allowed to access the API.
  //allowed origins are stored and protected in the .env file.
  //or * : allow any frontend/website to access the API
  origin: JSON.parse(process.env.CORS_ORIGIN) || "*",
  //defines allowed HTTP methods and request headers,
  //and returns a success status for preflight (OPTIONS) requests
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, //200=allow, 403 deny access. can also block countries?
};

module.exports = corsOptions;