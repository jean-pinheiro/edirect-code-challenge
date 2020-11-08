import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ProjectService from './ProjectService'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { faFolder } from '@fortawesome/free-solid-svg-icons';


class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      fetchError: false,
      errorMsg: 'We had a problem on doing this now, please try ',
      fetchMsg: '',
    }  

    this.listProjects = this.listProjects.bind(this);
  }

  async listProjects(){
    let projects = await ProjectService.list('5fa76cb39c848d23d22b66c3');
    if(projects.fetchError){
      this.setState({fetchError: true, fetchMsg: " again later"});
    }else{
      this.setState({projects});
    }
  }

  componentDidMount(){
    this.listProjects();    
  }

  render() {
    const { projects } = this.state;
    const fetchError  = (!this.state.fetchError) ? '' : (
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
          </Col>
        </Row>
      </Container>

    );
  }
}

export default ProjectList;