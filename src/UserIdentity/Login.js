import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import "./Login.css";
import ChatkitAuthentification from "./ChatkitAuthentification.js";


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      enableButton: false
    };
    this.url = 'https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/default/MatchMakingAuth';
    
    this.register = this.register.bind( this );
    this.auth = this.auth.bind( this );
    this.login = this.login.bind( this );
    this.forgot = this.forgot.bind( this );
    this.chatkitauth = new ChatkitAuthentification();
    this.chatkitauth.getToken();
  }
  
  componentDidMount() {
      document.body.classList.add("background");
  }

  componentWillUnmount() {
      document.body.classList.remove("background");
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
  //  event.preventDefault();
  }

  register(){
      this.props.callbackRegister(true);
  }
  
  forgot(){
      this.props.callbackForgot();
  }
  
  auth(status, user){
      console.log("message to callback: " + status)
      this.props.callbackAuth(status, this.chatkitauth.getAuthorization(), user);
  }
  
   
  login(){     
      // shortcut so i can see the chat
      this.auth(true, 10);
      // user id has to be provided => who am i? here, dummy user id = 10 is used
      
      var parameter = '?usecase=auth&email=' + this.state.email + '&password=' + this.state.password;
     
      const http = new XMLHttpRequest();
      http.open("GET", this.url + parameter);
      http.send();
      http.onreadystatechange=(e)=>{
          if(http.response == "") {
              console.log("no response")
          }

          
          if(http.responseText.includes("Authentication successful")) {
              this.auth(true, 10);
              // user id has to be provided => who am i? here, dummy user id = 10 is used
          }
          else {
              console.log(http.responseText);
              
          }
          
      }
  }
   
  render() {
    return (
      <div className="Login" >
          
          <p className="WelcomeText">
              Welcome to the Messe München Community Chat!
          </p>
      
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="Entry" controlId="email">
              <Form.Label></Form.Label>
              <Form.Control type="email" placeholder="Enter email"             
              onChange={this.handleChange}/>
            </Form.Group>

            <Form.Group className="Entry" controlId="password">
              <Form.Label></Form.Label>
              <Form.Control type="password" placeholder="Password"
              onChange={this.handleChange}
              />
            </Form.Group>
            <p className="Link" onClick={this.forgot}> Password forgotten? </p> 
            <p className="Link" onClick={this.register}> No account yet? Register here! </p> 
            <Button variant="secondary" className="ButtonLogin"  onClick={this.login} >
              Login
            </Button>
                </Form>

            </div>
        );
    }
}

export default Login;
