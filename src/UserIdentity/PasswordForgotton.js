


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
          
      <p className='PasswordForgottenHeadline'>
          Forgot your password?
      </p>
      
      <p className='PasswordForgottonText'>
          Please enter your email address linked to the Messe München Community Chat account. 
          If you are in our system, you will be redirected to the reset page.
      </p>
      
      <p className="PasswordForgottenEmail">
         Email
      </p>
      <Form onSubmit={this.handleSubmit}>
         <Form.Group controlId="email">
          <Form.Label></Form.Label>
           <Form.Control type="email" placeholder="Enter email"             
           onChange={this.handleChange}/>
          </Form.Group>
          <Button className="PasswordForgottenSubmit" variant="outline-primary" onClick={this.requestEmail} >
             Submit
        </Button>
     </Form> 
      <p className="PasswordForgottenLink" onClick={this.forgot}> 
             Back to Login 
      </p> 
      <p className="PasswordFogottenLink" onClick={this.register}> 
             No account yet? Register here! 
      </p>    
             
      </div>
    );
  }
}

export default PasswordForgotton;
