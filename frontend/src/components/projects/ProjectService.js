import axios from 'axios';
import {API_URL, authConfig, defaultConfig} from '../../config/apiConfig';

class ProjectService {

  list(userId) {
    return axios.get(API_URL + `api/project/list/${userId}`, defaultConfig()).then(response =>{
        return response.data;
    }).catch(error =>{
        console.log(error);
        return {fetchError: {error}};
    });
  }

  add(userId, projectName) {
    
    return axios.post(API_URL + `api/project/add/${userId}`, {projectName}, authConfig()).then(response =>{
        return response.data;
    }).catch(error =>{
        console.log(error);
        return {fetchError: {error, errorMsg: "add project again later"}};
    });
    
  }

  delete(projectId) {    
    return axios.post(API_URL + `api/project/delete/${projectId}`, {}, authConfig()).then(response =>{
        return response.data;
    }).catch(error =>{
        console.log(error);
        return {fetchError: {error, errorMsg: "delete project again later"}};
    });
    
  }

}

export default new ProjectService();