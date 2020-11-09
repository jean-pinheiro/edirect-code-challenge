import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Button } from 'react-bootstrap';
import TaskList from './TaskList';
import TaskService from './TaskService';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchError: false,
      errorMsg: 'We had a problem on doing this now, please try ',
      fetchMsg: '',
      taskDescription: ''
    }
    this.handleAddTaskChange = this.handleAddTaskChange.bind(this);
    this.handleAddTaskSubmit = this.handleAddTaskSubmit.bind(this);
  }

  handleAddTaskChange(e){
    this.setState({ fetchError: false, fetchMsg: '' });
    this.setState({taskDescription: e.target.value});
    
  }

  async handleAddTaskSubmit(e){
    e.preventDefault();
    this.setState({ fetchError: false, fetchMsg: '' });
    const { taskDescription } = this.state;
    if(taskDescription !== ''){

      const addResponse = await TaskService.add(this.props.projectId, taskDescription);  
      if(addResponse.fetchError){
        this.setState({fetchError: true, fetchMsg: addResponse.fetchError.errorMsg});
      }
      this.props.getTasks();
    }else{
      this.setState({fetchError: true, fetchMsg: "Please, type your task first"});
    }
  }


  render() {
    const { tasks } = this.props;
    const fetchError  = (!this.state.fetchError) ? '' : (
      <React.Fragment>
        <br />
        <span className="error_msg">{this.state.errorMsg+this.state.fetchMsg}</span> 
        <br />
      </React.Fragment>
    );
    return (
      <Row>
        <Col xs={{ span: 8, offset: 2 }} className="list">
          <p className="title">To-do</p>
          {fetchError}
          <TaskList projectId={this.props.projectId} getTasks={this.props.getTasks} tasks={tasks.filter((task) => task.done != true)} />
          <Form>
            <Form.Row className="align-items-center">
              <Col xs={{ span: 7, offset: 1 }} className="my-1">
                <Form.Control onChange={this.handleAddTaskChange} type="text" placeholder="Call Bank Manager..." />
              </Col >
              <Col xs={{ span: 4 }} className="my-1">
                <Button onClick={this.handleAddTaskSubmit}>+ Add New Task</Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
        <Col xs={{ span: 8, offset: 2 }} className="list">
          <p className="title">Done</p>
          <TaskList tasks={tasks.filter((task) => task.done == true)} />
        </Col>
      </Row>
    );
  }
}

export default Tasks;