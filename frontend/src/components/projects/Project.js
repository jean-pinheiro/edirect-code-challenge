import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tasks from '../tasks/Tasks';
import TaskService from '../tasks/TaskService';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import UserService from '../user/UserService';


class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      fetchError: false,
      fetchMsg: ''
    }
    
    this.getTasks = this.getTasks.bind(this);
  }

  async getTasks() {
    let projectId = this.props.match.params.id;
    let tasks = await TaskService.list(projectId);
    if(tasks.fetchError){
      this.setState({fetchError: true, fetchMsg:tasks.fetchError.errorMsg})
    }else{
      this.setState({tasks});
    }
  }

  componentDidMount(){
    const user = UserService.getCurrentUser();
    if(user && user.authUser.projects.length > 0 && !user.authUser.projects.includes(this.props.match.params.id)){        
      window.location='/projects';
    }else{
      this.getTasks(); 
    }
  }

  render() {
      const {name, id} = this.props.match.params;
      const {tasks} = this.state;
      
      return (
        <div>
          <Container>
            <Row>
              <Col xs={{ span: 8, offset: 2 }} className="list">
                <h3 >{name} </h3>
                <span><Link to="/projects"> <span className="link_back"> Back to Project List</span></Link></span>  
              </Col>
            </Row>
            <Tasks projectId={id} tasks={tasks} getTasks={this.getTasks} />
          </Container>
        </div>
      );
  }
}

export default Project;