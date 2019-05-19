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
          <p className="LeftHeader"> Registration </p>

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
          </Form>
            
            
      </div>
    );
  }
}

export default Register;