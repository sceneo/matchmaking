import React, { Component } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";

import APICallsToLambda from "./../UserIdentity/APICallsToLambda.js"
import { Segment } from 'semantic-ui-react';
class HowTo extends Component {
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
             
            This is how the tool works:
                - bla bla
                - bla bla
                - bla bla
          </div>
      
      
    );
  }
}

export default HowTo;