import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import "./Login.css";


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      usecase: "",
      enableButton: false
    };
    this.url = 'https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/Prod/MatchMakingAuth';
    
    this.register = this.register.bind( this );
    this.auth = this.auth.bind( this );
    this.login = this.login.bind( this );
    this.forgot = this.forgot.bind( this );
  }
  
  componentDidMount() {
      document.body.classList.add("background-login");
  }

  componentWillUnmount() {
      document.body.classList.remove("background-login");
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
      this.props.callbackAuth(status, user);
  }
  
   
  async login(){     
     
      var response = "";
      this.setState({
          usecase: "auth"
      })
      
      
      const payload = this.state
      
      await fetch(this.url,{
          headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":"*",
          "Content-type": "application/json; utf-8"
          },
          method: 'post',
          mode: 'cors',
          body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(data => {
           console.log(data)     
        })
        .catch(function (error) {
          console.log('Request failed', error);
        });
      
      
     
          
      if(response.includes("Authentication successful")) {
          this.auth(true, 10);
      // user id has to be provided => who am i? here, dummy user id = 10 is used
    
          this.chatkitauth.getToken('user nickname in the chat');
      //TODO
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
            <br />
            <p className="Link-login" onClick={this.forgot}> Password forgotten? </p> 
            <p className="Link-login" onClick={this.register}> No account yet? Register here! </p> 
            <Button variant="secondary" className="ButtonLogin"  onClick={this.login} >
              Login
            </Button>
                </Form>

            </div>
        );
    }
}

export default Login;
