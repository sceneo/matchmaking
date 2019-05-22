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
      
      var parameter = '?usecase=auth&email=' + this.state.email + '&password=' + this.state.password;
     
      const http = new XMLHttpRequest();
      http.open("GET", this.url + parameter);
      http.send();
      http.onreadystatechange=(e)=>{
          console.log(http.responseText)
          console.log(http.statusText)
          if(http.responseText.includes("Authentication successfull")) {
              this.auth(true);
          }
          
          else {
              console.log(http.responseText);
              window.alert("Please enter the CORRECT password.");
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
            <Form.Group controlId="email">
              <Form.Label></Form.Label>
              <Form.Control type="email" placeholder="Enter email"             
              onChange={this.handleChange}/>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label></Form.Label>
              <Form.Control type="password" placeholder="Password"
              onChange={this.handleChange}
              />
            </Form.Group>
            <p className="RegisterLink" onClick={this.register}> No account yet? Register here! </p> 
            <Button className="ButtonLogin" disabled={!this.state.enableButton} onClick={this.login} >
              Login
            </Button>
          </Form>     
             
      </div>
    );
  }
}

export default Login;
