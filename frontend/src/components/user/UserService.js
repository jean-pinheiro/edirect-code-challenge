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

  async login() {
  }

  

}

export default new UserService();