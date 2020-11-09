import React, { Component } from 'react';
import { Form, Button, Row , Col, Container, Card} from 'react-bootstrap';

import ProjectService from './ProjectService';
import UserService from '../user/UserService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { faFolder, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';


class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      fetchError: false,
      errorMsg: 'We had a problem on doing this now, please try ',
      fetchMsg: '',
      userId: UserService.getCurrentUser().authUser._id,
      projectName: ''
    }

    this.listProjects = this.listProjects.bind(this);
    this.handleAddProjectChange = this.handleAddProjectChange.bind(this);
    this.handleAddProjectSubmit = this.handleAddProjectSubmit.bind(this);
  }

  async listProjects() {
    this.setState({ fetchError: false});
    try {
      let projects = await ProjectService.list(this.state.userId);
      this.setState({ projects });
    } catch (error) {
      this.setState({ fetchError: true, fetchMsg: " again later" });
    }
  }
  async deleteProject(projectId) {
    if (window.confirm(`Are you sure you want to delete this Project?`)) {

      try {
      await ProjectService.delete(projectId);
      this.listProjects();
      } catch (error) {
          this.setState({ fetchError: true, fetchMsg: error.errorMsg })
      }
      
    }
  }

  handleAddProjectChange(e){
    this.setState({projectName: e.target.value});    
  }

  async handleAddProjectSubmit(e){
    e.preventDefault();
    const {projectName} = this.state;
    if(projectName !== ''){

      try {
      await ProjectService.add(this.state.userId, projectName); 
      this.listProjects(); 
      } catch(error){
        this.setState({fetchError: true, fetchMsg: error.errorMsg});
      }
      
    }else{
      this.setState({fetchError: true, fetchMsg: "Please, type your Project Name first"});
    }
  }

  componentDidMount() {    
    const user = UserService.getCurrentUser();
    if(user){
      this.setState({userId: user.authUser._id});
      this.listProjects();
    }else{
        window.location='/login';
    }
  }

  render() {
    const { projects, fetchError  } = this.state;
    const error = (!fetchError) ? '' : (
      <React.Fragment>
        <br />
        <span className="error_msg">{this.state.errorMsg +this.state.fetchMsg}</span>
        <br />
      </React.Fragment>
    );
    const listProjects = 
    (
      <React.Fragment>
         <ul>
          {
            projects.map((project, index) => {
              return <li key={index}>
                <Link to={`/project/${project.name}/${project._id}`}> <FontAwesomeIcon icon={faFolder} /><span>{project.name}</span></Link>
                <span className="projectIcons">
                    <a className="delete" href="#">
                        <FontAwesomeIcon onClick={() => this.deleteProject(project._id)} icon={faTrashAlt} />
                    </a>
                </span>                
              </li>
            })
          }
        </ul> 
      </React.Fragment>
    );
    return (
      <Container>
        <Row>
          <Col xs={{ span: 8, offset: 2 }} className="list">
            <p className="title">Your Projects</p>
            <Card>
              <Card.Body>
                {error}
                {listProjects}

              </Card.Body>
            </Card>
            <Form>
              <Form.Row className="align-items-center">
                <Col xs={{ span: 7, offset: 1 }} className="my-1">
                  <Form.Control onChange={this.handleAddProjectChange} type="text" placeholder="Design an app..." />
                </Col >
                <Col xs={{ span: 4 }} className="my-1">
                  <Button onClick={this.handleAddProjectSubmit}>+ Add New Project</Button>
                </Col>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Container>

    );
  }
}

export default ProjectList;