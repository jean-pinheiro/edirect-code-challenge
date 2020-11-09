import React, { Component } from "react";
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';

class Login extends Component {
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
                    <Form.Control type="text" required placeholder="Enter Username" />                    
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
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