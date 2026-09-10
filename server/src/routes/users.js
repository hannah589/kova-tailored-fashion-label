const express = require("express");
const router = express.Router();

//Middleware
//auth = verifies logged-in user
//admin = restricts access to admin users only
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

//Controller functions
const usersController = require("../controllers/users");

// POST: Create user. public registration
// Route: /api/users
router.post("/", usersController.postUser);

// GET: All users. Admin only access
// Route: /api/users
router.get("/", [auth, admin], usersController.getAllUsers);

// GET: User by username. Authorized users can access
// Route: /api/users/username/:username
router.get("/username/:username", auth, usersController.getUserByUsername);

// GET: User by ID
// Route: /api/users/:id
router.get("/:id", auth, usersController.getUserById);

// PUT: Update user by ID. logged-in users to edit their own profile
// Route: /api/users/:id
router.put("/:id", auth, usersController.putUser);

// DELETE: User by ID. Admin only can delete
// Route: /api/users/:id
router.delete("/:id", [auth, admin], usersController.deleteUser);

module.exports = router;
