//user request > routes > CONTROLLERS: (middleman) >  models: db structure > db > response

//import model
const { User } = require("../models/user");
//password hashing
const bcrypt = require("bcrypt");

module.exports = {
  //CREATE FUNCTIONS FOR ROUTES
  //export all controller functions for routes
  //In routes files. import this controller with require

  //POST: create user
  //Route: /api/users
  async postUser(req, res) {
    try{    
      //console.log("postUser hit")   

      const { username, email, password} = req.body;

      //validate required fields
      if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({
          message: "username, email, and password are required"
        });
      }

      // Check if username already exists
      const existingUser = await User.findOne({
        where: {username: req.body.username}
      })

      if(existingUser){
        return res.status(409).json({
          message: "Username already exists"
        });
      }

      // Check if email already exists
      const existingEmail = await User.findOne({
        where: { email },
      });

      if (existingEmail) {
        return res.status(409).json({
          message: "Email already exists",
        });
      }

      //generate salt and hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //Create new user
      const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword, //return hashed password
        isAdmin: false, //prevent admin self-registration
      });
      console.log("Success - User created", user)

      //generate auth token 
      const token = user.generateAuthToken()
      //attach token to response header
      res.header("x-auth-token", token)

      //respond. never return password
      return res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token
      });

    } catch (error) {
      internalError(error, res)
    }
  },

  //GET: all users
  //Route: /api/users
  async getAllUsers(req, res) {
    try{
      const users = await User.findAll({
        attributes: ["id", "username", "email", "isAdmin"],
        order: [["username", "ASC"]],
      });

      res.json(users);

    }catch(error){
      internalError(error, res);
    }
  },

  //GET: user by username
  //route: /api/users/username/:username
  async getUserByUsername(req, res){
    try{
      const user = await User.findOne({
        where: { username: req.params.username },
        attributes: ["id", "username", "email", "isAdmin"],
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.json(user)

    } catch (error) {
      internalError(error, res)
    }
  },

  //GET: user by id
  //Route: /api/users/:id
  async getUserById(req, res) {
    try{
      //find user to match integer of param id. return every attribute except password
      const user = await User.findByPk(req.params.id, {
        attributes: ["id", "username", "email", "isAdmin"],
      });
      // If user not found 
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      //return found user
      res.json(user);

    }catch(error){
      internalError(error, res)
    }
  },

  //PUT: update user by id
  //route: /api/users/:id
  async putUser(req, res) {
    try{
      const [userUpdate] = await User.update(
        {
          //fields to update
          username:  req.body?.username,
          email: req.body?.email,
          
          //only admins can change admin status
          ...(req.user?.isAdmin && {
            isAdmin: req.body?.isAdmin,
          }),
        },
        {
          where: { id: req.params.id }
        },
      );
      //no rows updated
      if(userUpdate === 0){
        return res.status(404).json({
          message: "User with the given ID was not found",
        });
      }
      //update() does not return updated data
      //fetch updated user
      const user = await User.findByPk(req.params.id, {
        //find id and provide back theses attributes
        attributes: ["id", "username", "email", "isAdmin"],
      });

      console.log("Success - User updated:", user);
        res.json(user);

    }catch(error){
      internalError(error, res)
    }
  },

  //DELETE user by id
  async deleteUser(req, res){
    try{
			const user = await User.findByPk(req.params.id);

			if(!user){
        return res.status(404).json({
          message: "User not found",
        });
      }

			await user.destroy();

			console.log("Success - User Deleted: ", user);

			res.json({ 
        message: "User deleted",
      });

		}catch(error){
			internalError(error, res);
		}
	},
};

//Internal server error handler
function internalError(error, res) {
  console.log(error);

  return res.status(500).json({
    message: "Internal Error - Please try again later.",
  });
}

