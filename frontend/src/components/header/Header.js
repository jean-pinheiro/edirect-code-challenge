import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import UserService from '../user/UserService'

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
        username:'',
        showInfoUser: false                   
    }

    this.setinfoUser = this.setinfoUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  setinfoUser() {
    const user = UserService.getCurrentUser();
    if(user){
      this.setState({username: user.authUser.username, showInfoUser: true})
    }
  }

  componentDidMount(){
    this.setinfoUser();
  }

  logout(e) {
    e.preventDefault();
    UserService.logout();
    this.setState({username: '', showInfoUser: false});
    window.location="/login";
  }


  render() {
    const userInfo = (!this.state.showInfoUser) ? (
      
        <a href="/register">Register</a>

    ) : (
      <React.Fragment>

        <div className="user_info">
          <span className="user_name"> Hello {this.state.username}  </span>
          <span onClick={this.logout} className="user_logout"> | Logout?  </span>
        </div>
      </React.Fragment>
    );


    return (
      <div>
        <div className="navbar">
          <div className="navbar-brand">
            <FontAwesomeIcon icon={faTasks}/>
              <span className="project_title">Project Tasks Management</span>
          </div>
             {userInfo}
        </div>
      </div>
    );
  }
}

export default Header;