import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskList from './TaskList';

class Tasks extends Component {
  render() {
    const {tasks} = this.props;
    return (
      <Row>
        <Col xs={{ span: 8, offset: 2 }} className="list">
          <p className="title">To-do</p>
          <TaskList projectID={this.props.projectID} getTasks={this.props.getTasks} tasks={tasks.filter((task) => task.done != true)} />
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