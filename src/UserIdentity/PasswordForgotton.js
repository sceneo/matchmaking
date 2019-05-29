


import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./PasswordForgotton.css";

class PasswordForgotton extends Component {
  constructor(props) {
    super(props);
  }

// # enter email
//  # receive email with ne password
  
      requestEmail(){
  }
  
  
  render() {
      
    return (
      <div className="PasswordForgotten">
          <p className="PasswordResetNotification">
              We will send you an email with a new password.
          </p>

          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label></Form.Label>
              <Form.Control type="email" placeholder="Enter email"             
              onChange={this.handleChange}/>
            </Form.Group>
            <Button className="RequestEmail"  onClick={this.requestEmail} >
              Request Email
            </Button>
          </Form>     
             
      </div>
    );
  }
}

export default PasswordForgotton;
