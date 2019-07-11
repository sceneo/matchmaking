import React, { Component } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";

import APICallsToLambda from "./../UserIdentity/APICallsToLambda.js"
import { Segment } from 'semantic-ui-react';
class Details extends Component {
    constructor(props) {
        super(props);

    }
    
    componentDidMount() { 
    }

    componentWillUnmount() {
    }
        
    render() {
        return (
          <div>
             I will add some user Details here
            
          </div>
      
      
    );
  }
}

export default Details;