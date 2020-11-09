import React, { Component } from 'react';
import { Form, Button, Row , Col, Container, Card} from 'react-bootstrap';

import ProjectService from './ProjectService'

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
      projectName: ''
    }

    this.listProjects = this.listProjects.bind(this);
    this.handleAddProjectChange = this.handleAddProjectChange.bind(this);
    this.handleAddProjectSubmit = this.handleAddProjectSubmit.bind(this);
  }

  async listProjects() {
    let projects = await ProjectService.list('5fa76cb39c848d23d22b66c3');
    if (projects.fetchError) {
      this.setState({ fetchError: true, fetchMsg: " again later" });
    } else {
      this.setState({ projects });
    }
  }
  async deleteProject(projectId) {
    if (window.confirm(`Are you sure you want to delete this Project?`)) {

      const deleteResponse = await ProjectService.delete(projectId);
      if (deleteResponse.fetchError) {
        this.setState({ fetchError: true, fetchMsg: deleteResponse.fetchError.errorMsg })
      }
      this.listProjects();
    }
  }

  handleAddProjectChange(e){
    this.setState({projectName: e.target.value});    
  }

  async handleAddProjectSubmit(e){
    e.preventDefault();
    const {projectName} = this.state;
    if(projectName !== ''){

      const addResponse = await ProjectService.add('5fa76cb39c848d23d22b66c3', projectName);  
      if(addResponse.fetchError){
        this.setState({fetchError: true, fetchMsg: addResponse.fetchError.errorMsg});
      }
      this.listProjects();
    }else{
      this.setState({fetchError: true, fetchMsg: "Please, type your Project Name first"});
    }
  }

  componentDidMount() {
    this.listProjects();
  }

  render() {
    const { projects } = this.state;
    const fetchError = (!this.state.fetchError) ? '' : (
      <React.Fragment>
        <br />
        <span className="error_msg">{this.state.fetchMsg}</span>
        <br />
      </React.Fragment>
    );
    const listProjects = (this.state.fetchError) ? '' : (
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
                <span className="projectIcons">
                    <a className="edit" href="#">
                        <FontAwesomeIcon onClick={() => this.deleteProject(project._id)} icon={faEdit} />
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
                {fetchError}
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