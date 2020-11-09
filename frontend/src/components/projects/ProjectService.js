import axios from 'axios';
import {API_URL, authConfig, defaultConfig} from '../../config/apiConfig';

class ProjectService {

  async list(userId) {
    const projects = await axios.get(API_URL + `api/project/list/${userId}`, defaultConfig()).then(response =>{
        return response.data;
    }).catch(error =>{
        return {fetchError: {error}};
    });

    return projects;
  }

  async add(userId, projectName) {
    
    const addResponse = await axios.post(API_URL + `api/project/add/${userId}`, {projectName}, authConfig()).then(response =>{
        return response.data;
    }).catch(error =>{
        return {fetchError: {error, errorMsg: "add project again later"}};
    });
    
    return addResponse;
  }

  async delete(projectId) {
    
    const addResponse = await axios.post(API_URL + `api/project/delete/${projectId}`, {}, authConfig()).then(response =>{
        return response.data;
    }).catch(error =>{
        return {fetchError: {error, errorMsg: "delete project again later"}};
    });
    
    return addResponse;
  }

}

export default new ProjectService();