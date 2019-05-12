import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
          firstname: "",
          lastname: ""
        };
      }
    

    validateForm() {
      return true;
    }
    
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    
    render() {
        
        return (
          <div className="Register">


          <Form onSubmit={this.handleSubmit}>
          
            <Form.Group controlId="LastName">
              <Form.Label>Title</Form.Label>              
                  <Form.Control as="select" onChange={this.handleChange}>
                      <option></option>
                      <option>Prof.</option>
                      <option>Prof. Dr.</option>
                      <option>Dr.</option>
                  </Form.Control>
            </Form.Group>          
          
            <Form.Group controlId="FirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name"             
              onChange={this.handleChange}/>
            </Form.Group>
            
            <Form.Group controlId="LastName">
              <Form.Label>Last Name</Form.Label>
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
                
            <Form.Group controlId="Username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username"             
              onChange={this.handleChange}/>
            </Form.Group>    
          
            <Form.Group controlId="Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"             
              onChange={this.handleChange}/>
            </Form.Group>

            <Form.Group controlId="Type">
            <Form.Label>Type</Form.Label>              
                <Form.Control as="select" onChange={this.handleChange}>
                    <option>Visitor</option>
                    <option>Exhibitor</option>
                </Form.Control>
            </Form.Group>   
            
            <Form.Group controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"
              onChange={this.handleChange}
              />
            </Form.Group>
            
            <Form.Group controlId="Hometown">
            <Form.Label>Hometown</Form.Label>              
                <Form.Control as="select" onChange={this.handleChange}>
                    <option>Munich</option>
                    <option></option>
                    <option></option>
                    <option>...</option>
                </Form.Control>
            </Form.Group>   
            
            <Form.Group controlId="Industry">
              <Form.Label>Industry</Form.Label>              
                <Form.Control as="select" onChange={this.handleChange}>
                    <option>Construction</option>
                    <option>IT</option>
                    <option>Consulting</option>
                    <option>Craft</option>
                    <option>Beauty</option>
                </Form.Control>
            </Form.Group>   
                

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>;     
            
            
      </div>
    );
  }
}

export default Register;