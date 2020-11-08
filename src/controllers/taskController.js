const Task = require("../models/task");
const Project = require("../models/project");
const moment = require('moment');


class taskController{

  async listTasks(req, res){
    const projectId = req.params.projectId;
    console.log(projectId);
    try {
      var project = await Project.findById({_id: projectId}).populate('tasks');
      console.log(project.tasks);
      return res.status(200).json(project.tasks);
    } catch (error) {
      res.status(500).json({message: "find document error: "+error})
    }
  }

  async addTask(req, res){
    try {
      
      const project = await Project.findById({_id: req.params.projectId});
      const addTask = {
        description: req.body.taskDescription,
        creationDate: moment().toISOString(),
        finishDate: '',   
      };
      const newTask = new Task(addTask);
      newTask.project = project;
      await newTask.save();
      project.tasks.push(newTask._id);
      await project.save();
      return res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({message: "Mongo error: "+error})
    }
  }

  async finishTask(req, res){
    try {
      var task = await Task.findById({_id: req.params.taskId});
      task.done = true;
      task.finishDate = moment().toISOString();
      task.save();
      return res.status(200).json({success: true});
    } catch (error) {
      res.status(500).json({succes: false, message: "Mongo error: "+error})
    }
  }

  async deleteTask(req, res){
    try {
      console.log(req.params.taskId);
      await Task.findOneAndRemove({_id: req.params.taskId});
      await Project.update({"tasks": req.params.taskId}, { "$pull": { "tasks": req.params.taskId }});
      return res.status(200).json({success: true});
    } catch (error) {
      res.status(500).json({succes: false, message: "Mongo error: "+error})
    }
  }

}

module.exports = new taskController();