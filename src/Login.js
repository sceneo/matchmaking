import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      enableButton: false
    };
    this.counter = 0;
    
    this.register = this.register.bind( this );
    this.auth = this.auth.bind( this );
    this.login = this.login.bind( this );
  }

  validate(){
    return this.state.email.length > 0 && this.state.email.includes("@") && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    if(this.validate()) {
        this.setState({
             enableButton: true
         }); 
    }
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  register(){
      this.props.callbackRegister(true);
  }
  
  auth(status){
      this.props.callbackAuth(status)
  }
  
  login(){

      var test_email = "t@k.de";
      var test_password = "ok";
      this.counter+=1;
      
      
      if(this.counter > 2) {
          window.alert("Sorry, your password seems really wrong. Please register.");
          this.auth(false);
          return
      }
      
      if( this.state.email == test_email && this.state.password == test_password ) {
          this.auth(true);
      }
      else {
          window.alert("Please enter the CORRECT password.");
      }
  }
  
  
  render() {
      
    return (
      <div className="Login">



          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address </Form.Label>
              <Form.Control type="email" placeholder="Enter email"             
              onChange={this.handleChange}/>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"
              onChange={this.handleChange}
              />
            </Form.Group>
            <text onClick={this.register}> Register </text>
            <Button disabled={!this.state.enableButton} variant="primary" onClick={this.login} type="submit">
              Submit
            </Button>
          </Form>     
             
      </div>
    );
  }
}

export default Login;
