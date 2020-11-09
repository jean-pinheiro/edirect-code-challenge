import axios from 'axios';
import {API_URL, defaultConfig} from '../../config/apiConfig';

class UserService {

  register(user) {
    
      return axios.post(API_URL + 'api/user/register', {user}, defaultConfig()).then(response =>{
        if(response.data.token){
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      }).catch(error =>{

        return {fetchError: {error, errorMsg: 'Please Try Again Later'}};
    });

  }

  login(user) {

    return axios.post(API_URL + 'api/user/login', {user}, defaultConfig()).then(response =>{
      if(response.data.token){
          localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }).catch(error =>{
        return {fetchError: {error, errorMsg: 'Please Try Again Later'}};
    });

  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  logout() {
    localStorage.removeItem("user");
  }
 

}

export default new UserService();