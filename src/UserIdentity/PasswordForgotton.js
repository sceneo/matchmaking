


import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./PasswordForgotton.css";

class PasswordForgotton extends Component {
  constructor(props) {
    super(props);
    
    this.register = this.register.bind(this);
    this.backToLogin = this.backToLogin.bind(this);
  }
  
  requestEmail(){
      window.alert('gnäg')
  }
  
  backToLogin(){
      this.props.callbackBackToLogin();
  }
  
  register(){
      this.props.callbackRegister(true);
  }
  
  componentDidMount() {
      document.body.classList.add("backgroundRegister");
  }

  componentWillUnmount() {
      document.body.classList.remove("backgroundRegister");
  }
  
  render() {
      
    return (
      <div className="PasswordForgotten">
          
          <p className='PasswordForgottenHeadline'>   Forgot your password? </p>
          <p className='PasswordForgottenText'> Please enter your email address linked to the Messe München Community Chat account. </p>
          <p className='PasswordForgottenText'> If you are in our system, you will be redirected to the reset page. </p>	
          <p className="PasswordForgottenEmail"> Email: </p>
          <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="email">
                  <Form.Label></Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange}/>
              </Form.Group>
              <Button className="PasswordForgottenSubmit" variant="outline-primary" onClick={this.requestEmail}> Submit </Button>
          </Form> 
          <p className="PasswordForgottenLink" onClick={this.backToLogin}> Back to Login </p> 
          <p className="PasswordForgottenLink" onClick={this.register}> No account yet? Register here! </p>    
      </div>
    );
  }
}

export default PasswordForgotton;
