import React, { Component } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { form } from "semantic-ui-react"
import APICallsToChatkit from "./../Chat/APICallsToChatkit.js"
import APICallsToLambda from "./../UserIdentity/APICallsToLambda.js"
import "./Register.css";
import { Segment } from 'semantic-ui-react';
class Register extends Component {
    constructor(props) {
        super(props);
        this.verbose = 1;
        this.url = 'https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/Prod/MatchMakingAuth';
        this.backToLogin = this.backToLogin.bind(this);
        this.state = ({
            title: '',
            firstName: '',
            lastName: '',
            gender: '',
            company: '',
            functionality: '',
            industry: '',
            interest: '',
            city: '',
            country: '',
            type: '',
            email: '',
            username: '',
            password: ''
        })
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        

        // insert some checks here
        
         this.registrationProcedure();
         this.backToLogin();
    };
    
    componentDidMount() {
        document.body.classList.add("backgroundRegister");
    }

    componentWillUnmount() {
        document.body.classList.remove("backgroundRegister");
    }
    
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    async callToAws() {
        if(this.verbose > 1) {
            console.log('Call to aws');
            console.log(this.state);
        }
        var api = new APICallsToLambda();
        await api.registerNewUser(this.state);
    }
    
    async callToChatkit() {
        if(this.verbose > 1) {
            console.log('Call to chatkit');
        }
        var api = new APICallsToChatkit();
        await api.initializeRoot(); 
        api.addUser(this.state.username, this.state.firstName,this.state.lastName,this.state.email)        
    }
          
    async registrationProcedure(){

        if(this.verbose > 1) {
            console.log('Registration')
        }
        await this.callToAws();
        await this.callToChatkit();
    }
    
    backToLogin(){
        this.props.callbackBackToLogin();
    }
    
    render() {
        return (         
          <div className="Register">
              <p className="Headline1"> Registration </p>
              <p className="Headline3"> Fields indicated with * need to be filled out. </p>
 
          
              <Segment.Group horizontal borderless class="ui borderless menu">
              <Segment>
                <p className="Headline2"> Personal details </p>               
                
                  <Form.Group as={Row} md="4" labelId="Field" controlId="Title" >
                  <Form.Label> Title </Form.Label >
                      <Form.Control as="select" id='title' onChange={this.handleChange}>
                          <option></option>
                          <option>Prof.</option>
                          <option>Prof. Dr.</option>
                          <option>Dr.</option>
                      </Form.Control>
 
                  </Form.Group>          
          
                  <Form.Group controlId="FirstName">
                      <Form.Label>First Name*</Form.Label>
                      <Form.Control type="text" id='firstName' onChange={this.handleChange} placeholder="First Name" required/>
                  </Form.Group>
            
                  <Form.Group controlId="LastName">
                      <Form.Label>Last Name*</Form.Label>
                      <Form.Control type="text" id='lastName' onChange={this.handleChange} placeholder="Last Name" required/>
                  </Form.Group>
            
                  <Form.Group controlId="Gender">
                      <Form.Label>Gender</Form.Label>              
                      <Form.Control as="select" id='gender' onChange={this.handleChange}>
                          <option></option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Else</option>
                      </Form.Control>
                  </Form.Group> 
            
                  <p className="Headline2"> Working background </p>
            
                  <Form.Group controlId="Company">
                      <Form.Label>Company</Form.Label>
                      <Form.Control type="text" id='company' onChange={this.handleChange} placeholder="Company"/>
                  </Form.Group> 
            
                  <Form.Group controlId="Industry">
                      <Form.Label>Industry*</Form.Label>              
                      <Form.Control as="select" id='industry' onChange={this.handleChange} required>
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
                    
                 <Form.Group controlId="Interests">
                    <Form.Label>Industry Interest*</Form.Label>              
                    <Form.Control as="select" id='interests' onChange={this.handleChange} required>
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
                    <Form.Control as="select" id='functionality' onChange={this.handleChange} required>
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
                 </Segment>
                 <Segment>
                    <Form.Group controlId="City">
                    <Form.Label>City*</Form.Label>
                    <Form.Control type="text" id='city' onChange={this.handleChange} placeholder="City" required/>
                    </Form.Group>
                    
                    <Form.Group controlId="Country">
                    <Form.Label>Country*</Form.Label>
                    <Form.Control type="text" id='country' onChange={this.handleChange} placeholder="Country" required  />
                    </Form.Group>
                    
                    <p className="Headline2"> Your role on the fair </p>
                    <p className="Headline3"> You might need to adjust this information prior to attending the next fair. </p>
                    
                    <Form.Group controlId="Type">
                    <Form.Label>Type*</Form.Label>              
                        <Form.Control as="select" id='type' onChange={this.handleChange} required>
                            <option>Visitor</option>
                            <option>Exhibitor</option>
                        </Form.Control>
                    </Form.Group>
                    
                    <p className="Headline2"> Account details </p>
                        
                    	<Form.Group controlId="Email">
                    	<Form.Label className="Label" column sm={2}>Email*</Form.Label>
                    	<Form.Control type="email" id='email' onChange={this.handleChange}  placeholder="Enter email" required/>
                    	</Form.Group> 
                    
                    	<Form.Group controlId="Username">
                          <Form.Label>Username*</Form.Label>
                          <Form.Control type="text" id='username' onChange={this.handleChange} placeholder="Username" required/>
                        </Form.Group>    
                        
                        
                        <Form.Group controlId="Password">
                          <Form.Label>Password*</Form.Label>
                          <Form.Control type="password"  id='password' onChange={this.handleChange} placeholder="Password" required/>
                        </Form.Group>
                    <p className="PasswordForgottenLink" onClick={this.backToLogin}> Back to Login </p>              
                    <Button variant="primary" onClick= {this.handleSubmit}>
                      Submit
                    </Button>
                    </Segment>
                 </Segment.Group>
               
            
      </div>      
    );
  }
}

export default Register;