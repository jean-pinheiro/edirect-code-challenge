import React, { Component } from "react";
import { Form, Button, Row, Container, Col, Card } from 'react-bootstrap';
import UserService from './UserService';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:{
              username:'',
              password:'',
              confirmPassword:''
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
          if(user.password !== user.confirmPassword){
              this.setState({error:"The passwords are different!"})           
          }else{
            const registerResponse = await UserService.register(user);
            console.log(registerResponse);
            if (registerResponse.fetchError) {
                this.setState({ fetchError: true, error: registerResponse.fetchError.errorMsg })
            }else{
                window.location="/";
            }
          }
        }else{
            this.setState({error:"Please, fill all the form"})
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
                    <Form.Control onChange={this.handleInputChange} name="username" required type="text" placeholder="Enter Username" />                    
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="password" required type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="confirmPassword" required type="password" placeholder="Confirm Password" />
                    </Form.Group>
                    <Button onClick={this.handleSubmit} variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                <span className="error_msg">{this.state.error}</span>
              </Card.Body> 
            </Card>
            </Col>
            </Row>
          </Container>
        );
    }
}

export default Register;