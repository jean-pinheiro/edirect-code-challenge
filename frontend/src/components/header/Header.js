import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Brand>
            <FontAwesomeIcon icon={faTasks}/>  <span className="project_title">Project Tasks Management</span>
             </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default Header;