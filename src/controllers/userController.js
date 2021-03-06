const User = require("../models/user");
const Project = require("../models/project");
const jwt = require('jsonwebtoken');


class userController{

  async register(req, res){
    console.log(req.body.user);
    try {
      var newUser = new User({username: req.body.user.username,
                              password: req.body.user.password,
                    });
      newUser.save();
      const id = newUser._id;
      var token = jwt.sign({ id }, process.env.TOKEN, {
        expiresIn: 3000
      });
      return res.json({ auth: true, token, authUser: {username: newUser.username, _id:newUser._id, projects: newUser.projects } });
    } catch (error) {
      res.status(500).json({message: "Mongo error: "+error})
    }
  }
  async login(req, res){
    console.log(req.body.user);
    try {
       const findUser = await User.findOne({username: req.body.user.username});
       if(findUser.password === req.body.user.password ){
          const id = findUser._id;
          var token = jwt.sign({ id }, process.env.TOKEN, {
            expiresIn: 3000
          });
          return res.json({ auth: true, token, authUser: {username: findUser.username, _id:findUser._id, projects: findUser.projects } });
        }
        res.status(400).json({message: "Login unauthorized!"});
    } catch (error) {
        res.status(500).json({message: "Mongo error: "+error});
    }
      
  }

  
}


module.exports = new userController();