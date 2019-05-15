import React, { Component } from "react";
import * as SendBird from 'sendbird';

class Chat extends Component {
  constructor(props) {
    super(props);
    var sb = new SendBird({'appId': 'B9F598DF-FB27-41F3-8D36-40CE53B9EF25'});
  }


  
  render() {
      
    return (
      <div className="Chat">
          Welcome to the chat
             
      </div>
    );
  }
}

export default Chat;
