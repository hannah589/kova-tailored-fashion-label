//* CUSTOM ERROR UTILITY CLASS 
//* Import development debug tool
const debugError500 = require("debug")("app:error500");

class ApiError {
	//? CLASS PROPERTIES: Properties to be passed in as parameters/arguments
	constructor(code, message, err) {
		this.code = code;
		this.message = message;
		this.err = err;
	}

	//* [400] Bad Request -  pass custom message & status code
	static badRequest(msg) {
		return new ApiError(400, `Bad Request: ${msg}`);
	}

	//* [401] Unauthorised - no or invalid credentials
	static denyAccess(msg) {
		return new ApiError(401, `Access Denied: ${msg}`);
	}

	//* [403] Forbidden - no privilege
	static forbidden(msg) {
		return new ApiError(401, `Access Denied: ${msg}`);
	}

	//* [404] Not Found - no arguments
	static notFound() {
		return new ApiError(404, "Resource Not Found");
	}

	static dbConflict(msg) {
		return new ApiError(409, `Conflict with Server: ${msg}`);
	}

	//* [412] Precondition Failed
	//? ADMIN Config
	static configError(msg) {
		return new ApiError(413, `Precondition Failed: ${msg}`);
	}

	//* [413] Entity too large
	static tooLarge(msg) {
		return new ApiError(413, `Upload failed: ${msg}`);
	}

	//* [422] Unprocessable Entity
	static cannotProcess(msg) {
		return new ApiError(422, `Upload failed: ${msg}`);
	}

	//* [500] Internal Server Error - our custom message to the client + the error stack from DB.
	//? Used for console logging
	static internal(msg, err) {
		debugError500(err);
		return new ApiError(500, `Internal Server Error: ${msg}`);
	}

	//* [507] Unprocessable Entity
	static storageFull(msg) {
		return new ApiError(507, `Upload failed: ${msg}`);
	}
}

module.exports = ApiError;
