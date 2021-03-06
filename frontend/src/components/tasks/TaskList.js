import React, { Component } from 'react';
import {Card, Table} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import TaskService from './TaskService';
import Moment from 'react-moment';


class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      fetchError: false,
      errorMsg: 'We had a problem on doing this now, please try ',
      fetchMsg: '',
      taskEdit: {},
      edit: false
    }
  }

  async finishTask(taskId) {
    this.setState({ fetchError: false, fetchMsg: '' });
    try {
      await TaskService.finish(taskId);
      this.props.getTasks();
    } catch (error) {
      this.setState({ fetchError: true, fetchMsg: error.errorMsg })
    }
    
  }

  async deleteTask(taskId) {
    this.setState({ fetchError: false, fetchMsg: '' });
    if (window.confirm(`Are you sure you want to delete this task?`)) {
      try {
        await TaskService.delete(taskId);
        this.props.getTasks();
      } catch (error) {
        this.setState({ fetchError: true, fetchMsg: error.errorMsg })
      }
      
    }
  }

  render() {
    const fetchError = (!this.state.fetchError) ? '' : (
      <React.Fragment>
        <br />
        <span className="error_msg">{this.state.errorMsg + this.state.fetchMsg}</span>
        <br />
      </React.Fragment>
    );
    return (
      <div>
        <Card>
          <Card.Body>
            {fetchError}
            <Table responsive>
              <tbody>
                {this.props.tasks.map((task, index) => {
                  return <tr key={index}>
                    <td className="col-md-10">
                      <span id={task._id} className={task.done ? 'task_done' : ''}>                        
                          <>                          
                            {task.description}
                            <span className="tooltiptext ">
                            {
                              task.done === true
                                ?
                                <>
                                Done on:  
                                <Moment format=" DD/MM/YYYY HH:MM">
                                  {task.finishDate}
                                </Moment>
                                </>
                                : null
                            }                                                                      
                            </span>
                          </>  
                      </span>
                    </td>
                    <td>
                      {
                        task.done === false
                          ? <a className="finish" href="#">
                            <FontAwesomeIcon onClick={() => this.finishTask(task._id)} icon={faCheckCircle} />
                          </a>
                          : null
                      }
                    </td>
                    <td>
                      {
                        task.done === false
                          ? <a className="delete" href="#">
                            <FontAwesomeIcon onClick={() => this.deleteTask(task._id)} icon={faTrashAlt} />
                          </a>
                          : null
                      }
                    </td>
                  </tr>;
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <br></br>
      </div>
    );
  }
}

export default TaskList;