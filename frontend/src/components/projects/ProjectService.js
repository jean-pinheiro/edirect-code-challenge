import axios from 'axios';
import {API_URL, defaultConfig} from '../../config/apiConfig';

class ProjectService {

  async list(userId) {
    const projects = await axios.get(API_URL + `api/project/list/${userId}`, defaultConfig()).then(response =>{
        console.log(response.data);
        return response.data;
    }).catch(error =>{
        console.log(error);
        return {fetchError: {error}};
    });

    return projects;
  }

  async add(userId, project) {
    
    const addResponse = await axios.post(API_URL + `api/project/add/${userId}`, project, defaultConfig()).then(response =>{
        console.log(response.data);
        return response.data;
    }).catch(error =>{
        console.log(error);
        return {fetchError: {error, errorMsg: "add project again later"}};
    });
    
    return addResponse;
  }

  async delete(projectId) {
    
    const addResponse = await axios.post(API_URL + `api/project/delete/${projectId}`, {}, defaultConfig()).then(response =>{
        console.log(response.data);
        return response.data;
    }).catch(error =>{
        console.log(error);
        return {fetchError: {error, errorMsg: "delete project again later"}};
    });
    
    return addResponse;
  }

}

export default new ProjectService();