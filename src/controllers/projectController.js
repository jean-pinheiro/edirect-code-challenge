const User = require("../models/user");
const Project = require("../models/project");


class projectController{

  async listProjects(req, res){
    const userId = req.params.userId;
    console.log(userId);
    try {
      var user = await User.findById({_id: userId}).populate('projects');
      var projects = user.projects;
      /* console.log('projects');
      console.log(projects);
      console.log('typeof projects');
      console.log(typeof projects); */
      return res.status(200).json(user.projects);
    } catch (error) {
      res.status(500).json({message: "find document error: "+error})
    }
  }

  async addProject(req, res){
    const userId = req.params.userId;
    try {
      var user = await User.findById({userId});
      var newProject = new Project(req.body);
      newProject.user = user;
      await newProject.save();
      user.projects.push(newProject);
      await user.save();
      return res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({message: "Mongo error: "+error})
    }
  }
}


module.exports = new projectController();