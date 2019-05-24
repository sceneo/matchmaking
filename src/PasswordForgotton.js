


import React, { Component } from "react";

class PasswordForgotton extends Component {
  constructor(props) {
    super(props);
  }
// title bar
//      logout
//      
// central chat functionality
//      https://medium.freecodecamp.org/how-to-build-a-react-js-chat-app-in-10-minutes-c9233794642b
// links contact list (filled with ackend call tbd)
// Match Me Button auf dem Boden der Seite zu Match Me funktionalität
// # enter email
//  # receive email with ne password
  
  
  render() {
      
    return (
      <div className="PasswordForgotten">
          <p className="PasswordResetNotification">
              We will send you an email with a new password.
          </p>

          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label></Form.Label>
              <Form.Control type="email" placeholder="Enter email"             
              onChange={this.handleChange}/>
            </Form.Group>
            <Button className="RequestEmail" disabled={!this.state.requestEmail} onClick={this.requestEmail} >
              Request Email
            </Button>
          </Form>     
             
      </div>
    );
  }
}

export default PasswordForgotton;
