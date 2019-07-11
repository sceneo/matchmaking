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
             
              <h1> Find new friends </h1>
              <p> 'Click on MatchMe! to get suggestions for new friends based on a neural network. Let the computer select the best match for you. You decide if you want to chat with the suggested user (click on thumbs up) or ignore him (click on thumbs down).  All users you added as friends are put into your contact list.' </p>
          </div>
    );
  }
}

export default HowTo;