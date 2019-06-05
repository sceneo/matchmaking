import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./Register.css";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
          firstname: "",
          lastname: ""
        };
        this.url = 'https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/default/MatchMakingAuth';
        this.backToLogin = this.backToLogin.bind(this);
    }
    

    componentDidMount() {
        document.body.classList.add("backgroundRegister");
    }

    componentWillUnmount() {
        document.body.classList.remove("backgroundRegister");
    }
    
    validateForm() {
      return true;
    }
    
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    
    backToLogin(){
        this.props.callbackBackToLogin();
    }
    
    register(){   
        var parameter = '?usecase=add&email=' + this.state.email + '&password=' + this.state.password;
        const http = new XMLHttpRequest();
        http.open("GET", this.url + parameter);
        http.send();
        http.onreadystatechange=(e)=>{
            console.log(http.responseText)
            console.log(http.statusText)
            if(http.responseText.includes("Authorization successfull")) {
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
          <div className="Register">
          <p className="Headline1"> Registration </p>
          <p className="Headline3"> Fields indicated with * need to be filled out. </p>

          <Form onSubmit={this.handleSubmit}>
          <p className="Headline2"> Personal details </p>
          
          
            <Form.Group labelId="Field" controlId="Title">
              <Form.Label>Title</Form.Label>              
                  <Form.Control as="select" onChange={this.handleChange}>
                      <option></option>
                      <option>Prof.</option>
                      <option>Prof. Dr.</option>
                      <option>Dr.</option>
                  </Form.Control>
                  <Form.Text className="text-label"/>
                  
            </Form.Group>          
          
            <Form.Group controlId="FirstName">
              <Form.Label>First Name*</Form.Label>
              <Form.Control type="text" placeholder="First Name"             
              onChange={this.handleChange}/>
            </Form.Group>
            
            <Form.Group controlId="LastName">
              <Form.Label>Last Name*</Form.Label>
              <Form.Control type="text" placeholder="Last Name"             
              onChange={this.handleChange}/>
            </Form.Group>
            
            <Form.Group controlId="Gender">
            <Form.Label>Gender</Form.Label>              
                <Form.Control as="select" onChange={this.handleChange}>
                    <option></option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Else</option>
                </Form.Control>
            </Form.Group> 
            
            <p className="Headline2"> Working background </p>
            
            <Form.Group controlId="Company">
            <Form.Label>Company</Form.Label>
            <Form.Control type="text" placeholder="Company"             
            onChange={this.handleChange}/>
            </Form.Group> 
            
            <Form.Group controlId="Industry">
            <Form.Label>Industry*</Form.Label>              
                <Form.Control as="select" onChange={this.handleChange}>
                    <option></option>
                    <option>Automotive</option>
                    <option>Chemistry</option>
                    <option>Construction</option>
                    <option>Consumer goods</option>
                    <option>Electronics</option>
                    <option>Energy</option>
                    <option>Forestry</option>
                    <option>Furnitures</option>
                    <option>ICT</option>
                    <option>Health Care</option>
                    <option>Metal Production</option>
                    <option>Publishing and Media</option>
                    <option>Retail and Wholesale</option>
                    <option>Textile and Clothing</option>
                    <option>Traffic and Transport</option>
                    <option>Other</option>
                </Form.Control>
          </Form.Group>
          
          <Form.Group controlId="Functionality">
          <Form.Label>Functionality*</Form.Label>              
              <Form.Control as="select" onChange={this.handleChange}>
                  <option></option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Procurement</option>
                  <option>Event Management</option>
                  <option>Research and Development</option>
                  <option>PR and Communication</option>
                  <option>Quality Management</option>
                  <option>IT</option>
                  <option>Finance and Controlling</option>
                  <option>Human Resources</option>
                  <option>Executive Management</option>
                  <option>Freelance Professional</option>
                  <option>Other</option>
              </Form.Control>
        </Form.Group> 
      
        <Form.Group controlId="City">
        <Form.Label>City*</Form.Label>
        <Form.Control type="text" placeholder="City"             
        onChange={this.handleChange}/>
        </Form.Group>
        
        <Form.Group controlId="Country">
        <Form.Label>Country*</Form.Label>
        <Form.Control type="text" placeholder="Country"             
        onChange={this.handleChange}/>
        </Form.Group>
        
        <p className="Headline2"> Your role on the fair </p>
        <p className="Headline3"> You might need to adjust this information prior to attending the next fair. </p>
        
        <Form.Group controlId="Type">
        <Form.Label>Type*</Form.Label>              
            <Form.Control as="select" onChange={this.handleChange}>
                <option>Visitor</option>
                <option>Exhibitor</option>
            </Form.Control>
        </Form.Group>
        
        <p className="Headline2"> Account details </p>
            
        	<Form.Group controlId="Email">
        	<Form.Label class="Label" column sm={2}>Email*</Form.Label>
        	<Form.Control type="email" placeholder="Enter email"             
        		onChange={this.handleChange} />
        	</Form.Group> 
        
        	<Form.Group controlId="Username">
              <Form.Label>Username*</Form.Label>
              <Form.Control type="text" placeholder="Username"             
              onChange={this.handleChange}/>
            </Form.Group>    
            
            
            <Form.Group controlId="Password">
              <Form.Label>Password*</Form.Label>
              <Form.Control type="password" placeholder="Password"
              onChange={this.handleChange}/>
            </Form.Group>
            
            
            <p className="PasswordForgottenLink" onClick={this.backToLogin}> Back to Login </p>              
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
            
      </div>
      
      
    );
  }
}

export default Register;