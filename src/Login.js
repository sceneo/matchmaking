import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
    
    this.register = this.register.bind( this );
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  register(){
      this.props.callbackRegister();
  }
  
  render() {
      
    return (
      <div className="Login">


            

          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address </Form.Label>
              <Form.Control type="email" placeholder="Enter email"             
              onChange={this.handleChange}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"
              onChange={this.handleChange}
              />
            </Form.Group>
            <h5 onClick={this.register}> Register </h5>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>;     
             
      </div>
    );
  }
}

export default Login;
