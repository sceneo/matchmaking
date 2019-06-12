import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import APICallsToChatkit from '../Chat/APICallsToChatkit.js'
import "./Register.css";
class Register extends Component {
    constructor(props) {
        super(props);

        this.url = 'https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/default/MatchMakingAuth';
        this.backToLogin = this.backToLogin.bind(this);
        this.api = new APICallsToChatkit();
        this.state = ({
            title: '',
            firstName: '',
            lastName: '',
            gender: '',
            company: '',
            functionality: '',
            city: '',
            country: '',
            type: '',
            email: '',
            username: '',
            password: ''
        })
    }
    
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
        await fetch(this.url + '?usecase=register' ,{
        method: 'post',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: this.state
      })
      .then(response => response.json())
      .then(data => {
         console.log(data)
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
    }
    
    
    
    async handleSubmit(){
        // check in backend if available
        // add to backend
        // -> add to dynamoDB
        // -> add to chatkit
       
        await this.callToAws();
        
        //TODO: this must be fixed: a signed su token must be crated to create users...
   //     await this.api.addUser('tobi', 'tobias', 'kunz', 'bla@gmx,de', '666');
    }
    
    backToLogin(){
        this.props.callbackBackToLogin();
    }
    
    render() {
        
        console.log(this.state);
        return (
          <div className="Register">
              <p className="Headline1"> Registration </p>
              <p className="Headline3"> Fields indicated with * need to be filled out. </p>

              <Form onSubmit={this.handleSubmit}>
                  <p className="Headline2"> Personal details </p>
          
                  <Form.Group labelId="Field" controlId="Title" >
                      <Form.Label> Title </Form.Label >              
                      <Form.Control as="select" id='title' onChange={this.handleChange}>
                          <option></option>
                          <option>Prof.</option>
                          <option>Prof. Dr.</option>
                          <option>Dr.</option>
                      </Form.Control>
                      <Form.Text className="text-label"/>    
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
                      <Form.Control as="select" id='company' onChange={this.handleChange} required>
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
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
               </Form>
            
      </div>
      
      
    );
  }
}

export default Register;