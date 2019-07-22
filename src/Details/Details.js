import React, { Component } from "react";
//import APICallsToLambda from "./../UserIdentity/APICallsToLambda.js"
//import { Segment } from 'semantic-ui-react';
class Details extends Component {
    constructor(props) {
        super(props);
        this.api = this.props.apiCallsToLambda;
    }
    
    componentDidMount() { 
    }

    componentWillUnmount() {
    }
    
    
    render() {
        return (
          
          <div class="ui card">
          <h1> Your Details </h1>
          <div class="image">
            <img alt='Avatar' src={require('../img/avatar/' + this.api.getPrimaryUserDetails().avatar + '.jpg')} />
          </div>
          <div class="content">
            <p class="header">{this.api.getPrimaryUserDetails().username} </p>
            <div class="meta">
              <span class="FullName"> {this.api.getPrimaryUserDetails().firstname} {this.api.getPrimaryUserDetails().lastname} ({this.api.getPrimaryUserDetails().gender})</span>
            </div>
            <div class="description">
                {this.api.getPrimaryUserDetails().email} <p/>
                {this.api.getPrimaryUserDetails().city} ({this.api.getPrimaryUserDetails().country}) <p/>
                {this.api.getPrimaryUserDetails().functionality} ({this.api.getPrimaryUserDetails().industry}) <p/>
                {this.api.getPrimaryUserDetails().type} 
            </div>
          </div>
          <div class="extra content">
            <p>
              <i class="user icon"></i>
              {this.api.getPrimaryUserDetails().whitelist.split("@").length-1} Friends
            </p>
          </div>
         </div>

    );
  }
}

export default Details;