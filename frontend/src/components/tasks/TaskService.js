import axios from 'axios';
import {API_URL, defaultConfig, authConfig} from '../../config/apiConfig';

class TaskService {

  list(projectId) {
    return axios.get(API_URL + `api/task/list/${projectId}`, defaultConfig()).then(response =>{
        return response.data;
    }).catch(error =>{
        return {fetchError: {error, errorMsg: "view tasks again later"}};
    });
  }

  add(projectId, taskDescription) {
    
    return axios.post(API_URL + `api/task/add/${projectId}`, {taskDescription}, authConfig()).then(response =>{
        return response.data;
    }).catch(error =>{
        return {fetchError: {error, errorMsg: "adding task again later"}};
    });
  
  }

  finish(taskId) {
    
    return axios.post(API_URL + `api/task/finish/${taskId}`, {},  authConfig()).then(response =>{
        return response.data;
    }).catch(error =>{
        return {fetchError: {error, errorMsg: "finishing task again later"}};
    });
    
  }

  delete(taskId) {
    
    return axios.post(API_URL + `api/task/delete/${taskId}`, {},  authConfig()).then(response =>{
        return response.data;
    }).catch(error =>{
        return {fetchError: {error, errorMsg: "deleting task again later"}};
    });
    
    
  }

}

export default new TaskService();