


import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./PasswordForgotton.css";
import APICallsToLambda from "./APICallsToLambda.js"

class PasswordForgotton extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        email: ''
    })
    this.api = new APICallsToLambda();
    this.register = this.register.bind(this);
    this.backToLogin = this.backToLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.requestEmail = this.requestEmail.bind(this);
    this.getPassword = this.getPassword.bind(this);
  }
  
  handleSubmit(){
      this.requestEmail();
      this.backToLogin();
  }
  
  handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
  }
  
  async getPassword(email) {
      await this.api.getUserDetailsByEmail(email)
      var user = this.api.getPrimaryUserDetails();
      if(user !== null) {
          return user.password
      }
      return 'Your password has not been found in our database, please contact the team directly'
  }
  
  toParams(data_js) {
      var form_data = [];
      for ( var key in data_js ) {
          form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
      }

      return form_data.join("&");
  }
  
  async requestEmail(){
      var password = await this.getPassword(this.state.email)
      
      
      var data_js = {
              "access_token": "f48l4pnkasqn8lo72pn0dvtk"
          };
      
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
          if (request.readyState == 4 && request.status == 200) {
              console.log('success');
          } else
          if(request.readyState == 4) {
              console.log('failed');
          }
      };

      var subject = 'Your Community Chat Password';
      var message = 'Hi,\nyou have requested your community chat password from the website. It is \n\n' + password + '\n\nPlease note that we will not print your username here for security reasons.\n\nIf you have not requested anything, please ignore this email.\n\nBest regards,\n Your CC Team';
      data_js['subject'] = subject;
      data_js['text'] = message;
      var params = this.toParams(data_js);

      request.open("POST", "https://postmail.invotes.com/send", true);
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      request.send(params);
      
      
      
      window.alert('An email has been sent to ' + this.state.email + '.')
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
              <Form.Group controlId="email">
                  <Form.Label></Form.Label>
                  <Form.Control type="email" id='email' placeholder="Enter email" onChange={this.handleChange}/>
              </Form.Group>
              <Button className="PasswordForgottenSubmit" variant="outline-primary" onClick={this.handleSubmit}> Submit </Button>
          <p className="PasswordForgottenLink" onClick={this.backToLogin}> Back to Login </p> 
          <p className="PasswordForgottenLink" onClick={this.register}> No account yet? Register here! </p>    
      </div>
    );
  }
}

export default PasswordForgotton;
