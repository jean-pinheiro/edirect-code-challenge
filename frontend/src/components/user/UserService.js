import axios from 'axios';
import {API_URL, defaultConfig} from '../../config/apiConfig';

class UserService {

  async register(user) {
      console.log(user);
      const register = await axios.post(API_URL + 'api/user/register', {user}, defaultConfig()).then(response =>{
        console.log(response.data);
        return response.data;
      }).catch(error =>{
        console.log(error);
        return {fetchError: {error, errorMsg: 'Please Try Again Later'}};
    });

    return register;
  }

  async login(user) {
    console.log(user);
    const login = await axios.post(API_URL + 'api/user/login', {user}, defaultConfig()).then(response =>{
      console.log(response.data);
      if(response.data.token){
          localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }).catch(error =>{
        console.log(error);
        return {fetchError: {error, errorMsg: 'Please Try Again Later'}};
    });

    return login;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  logout() {
    localStorage.removeItem("user");
  }
 

}

export default new UserService();