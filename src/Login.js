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
    this.url = 'https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/default/MatchMakingAuth';
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
      this.counter+=1;
      if(this.counter > 2) {
          window.alert("Sorry, your password seems really wrong. Please register.");
          this.auth(false);
          return
      }
      
      
      var parameter = '?usecase=auth&email=' + this.state.email + '&password=' + this.state.password
      fetch( this.url + parameter )
           
// TODO
      var statusCode = 0;
      console.log("get the status code: todo")
  .   console.log(this.url + parameter)            
      if( statusCode == 201 ) {          
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
