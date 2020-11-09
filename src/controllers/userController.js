const User = require("../models/user");
const Project = require("../models/project");


class userController{

  async register(req, res){
    console.log(req.body.user);
    try {
      var newUser = new User({username: req.body.user.username,
                              password: req.body.user.password,
                    });
      newUser.save();
      return res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({message: "Mongo error: "+error})
    }
  }
  async login(){}

  
}


module.exports = new userController();