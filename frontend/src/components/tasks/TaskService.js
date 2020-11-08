import axios from 'axios';
import {API_URL, defaultConfig} from '../../config/apiConfig';

class TaskService {

  async list(projectId) {
    const projects = await axios.get(API_URL + `api/task/list/${projectId}`, defaultConfig()).then(response =>{
        return response.data;
    }).catch(error =>{
        console.log(error);
        return {fetchError: {error, errorMsg: "view tasks again later"}};
    });

    return projects;
  }

  async add(projectId, project) {
    
    const addResponse = await axios.post(API_URL + `api/task/add/${projectId}`, project, defaultConfig()).then(response =>{
        return response.data;
    }).catch(error =>{
        console.log(error);
        return {fetchError: {error, errorMsg: "adding task again later"}};
    });
    
    return addResponse;
  }

  async finish(taskId) {
    
    const addResponse = await axios.post(API_URL + `api/task/finish/${taskId}`, {}, defaultConfig()).then(response =>{
        return response.data;
    }).catch(error =>{
        console.log(error);
        return {fetchError: {error, errorMsg: "finishing task again later"}};
    });
    
    return addResponse;
  }

  async delete(taskId) {
    
    const addResponse = await axios.post(API_URL + `api/task/delete/${taskId}`, {}, defaultConfig()).then(response =>{
        return response.data;
    }).catch(error =>{
        console.log(error);
        return {fetchError: {error, errorMsg: "deleting task again later"}};
    });
    
    return addResponse;
  }

}

export default new TaskService();