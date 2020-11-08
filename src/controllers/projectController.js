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
    try {
      var user = await User.findById({_id: req.params.userId});
      var newProject = new Project({name: req.body.projectName});
      newProject.user = user;
      await newProject.save();
      user.projects.push(newProject._id);
      await user.save();
      return res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({message: "Mongo error: "+error})
    }
  }

  async deleteProject(req, res){
    try {
      console.log(req.params.projectId);
      await Project.findOneAndRemove({_id: req.params.projectId});
      await User.update({"projects": req.params.projectId}, { "$pull": { "projects": req.params.projectId }});
      return res.status(200).json({success: true});
    } catch (error) {
      res.status(500).json({succes: false, message: "Mongo error: "+error})
    }
  }
}


module.exports = new projectController();