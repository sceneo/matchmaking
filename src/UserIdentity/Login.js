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
      usecase: "auth",
      enableButton: false,
      statusMessage: ""
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
      this.props.callbackAuth(status, user);
  }
  
   
  async login(){     
     
      var response = "";
      this.setState({
          usecase: "auth"
      })
      
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
            if(data.includes("Authentication successful")) {
                this.props.apiCallsToLambda.getUserDetailsByEmail(this.state.email);
                this.auth(true, this.state.email); 
            }
            else {
                this.setState({
                    statusMessage: "Wrong credentials."
                })
            }
        })
        .catch(function (error) {
            console.log(error)
        });       
  }
   
  render() {
    return (
      <div className="Login" >
          
          <p className="WelcomeText">
              Welcome to the Messe München Community Chat!
          </p>
      
          <p className="StatusMessage">
              {this.state.statusMessage}
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
