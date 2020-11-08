import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import TaskService from './TaskService';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      fetchError: false,
      errorMsg: 'We had a problem on doing this now, please try ',
      fetchMsg: '',
    }
  }

  async finishTask(taskId) {

    const finishResponse = await TaskService.finish(taskId);
    console.log(finishResponse);    
    if(finishResponse.fetchError){
      this.setState({fetchError: true, fetchMsg: finishResponse.fetchError.errorMsg})
    }
    this.props.getTasks();
  }

  async deleteTask(taskId) {
    if (window.confirm(`Are you sure you want to delete this task?`)) {

      const deleteResponse = await TaskService.delete(taskId);   
      if(deleteResponse.fetchError){
        this.setState({fetchError: true, fetchMsg: deleteResponse.fetchError.errorMsg})
      }
      this.props.getTasks();
    }
  }

    render() {
      const fetchError  = (!this.state.fetchError) ? '' : (
        <React.Fragment>
          <br />
          <span className="error_msg">{this.state.errorMsg+this.state.fetchMsg}</span> 
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
                     <td className="col-md-10"><span className={task.done? 'task_done': ''}>{task.description}</span></td>
                     <td>
                       { 
                         task.done === false
                         ? <a className="check" href="#">
                             <FontAwesomeIcon onClick={() => this.finishTask(task._id)} icon={faCheckCircle}/>
                           </a> 
                         : null
                       }
                     </td>
                     <td>
                     { 
                         task.done === false
                         ? <a className="delete" href="#">
                            <FontAwesomeIcon onClick={() => this.deleteTask(task._id)} icon={faTrashAlt}/>
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
        </div>
    );
    }
}

export default TaskList;