import React, { Component } from "react";
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import UserService from './UserService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{
              username:'',
              password:'',
            },          
          fetchError:false,
          error:'',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({user: {...this.state.user, [name]:value}})
    }

    async handleSubmit(e){
        e.preventDefault();
        const {user} = this.state;
        if(user !== {}){
            const loginResponse = await UserService.login(user);
            console.log(loginResponse);
            if (loginResponse.fetchError) {
                this.setState({ fetchError: true, error: loginResponse.fetchError.errorMsg })
            }else if(loginResponse.auth){
                console.log(localStorage.getItem('authToken'));

                window.location="/projects";
            }          
        } else{
            this.setState({error:"Please, insert your Username and Password"})
        }
    }

    componentDidMount(){
        const user = UserService.getCurrentUser();
        if(user){        
          window.location='/projects';
        }
      }
    render() {
        return (
          <Container>
            <Row>
             <Col xs={{ span: 6, offset: 2 }} className="list">
             <Card>
               <Card.Body>  
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={this.handleInputChange} type="text"  name="username" required placeholder="Enter Username" />                    
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleInputChange} type="password" name="password" required placeholder="Password" />
                    </Form.Group>
                    <Button onClick={this.handleSubmit} variant="primary" type="submit">
                        Login
                    </Button>
                  </Form>
                </Card.Body> 
              </Card>
            </Col> 
            </Row>
        </Container>
        );
    }
}

export default Login;