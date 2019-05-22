import React, { Component } from "react";
import * as SendBird from 'sendbird';

class Chat extends Component {
  constructor(props) {
    super(props);
    var sb = new SendBird({'appId': 'B9F598DF-FB27-41F3-8D36-40CE53B9EF25'});
  }
// title bar
//      logout
//      
// central chat functionality
//      https://medium.freecodecamp.org/how-to-build-a-react-js-chat-app-in-10-minutes-c9233794642b
// links contact list (filled with ackend call tbd)
// Match Me Button auf dem Boden der Seite zu Match Me funktionalität
  
  
  render() {
      
    return (
      <div className="Chat">
          Welcome to the chat
             
      </div>
    );
  }
}

export default Chat;
