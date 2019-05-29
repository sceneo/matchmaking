import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav'


import ChatMessageList from './ChatMessageList.js'
import SendMessageForm from './SendMessageForm.js'
import Contacts from './Contacts.js'

//  base url https://api-{application_id}.sendbird.com/v3
// https://docs.sendbird.com/platform/user#3_list_users

const username = 'MatchMaking'


class Chat extends Component {
// title 
//      logout
//      
// central chat functionality
//      https://medium.freecodecamp.org/how-to-build-a-react-js-chat-app-in-10-minutes-c9233794642b
// links contact list (filled with ackend call tbd)
// Match Me Button auf dem Boden der Seite zu Match Me funktionalität
  
  constructor() {
      super()
  } 
  
  componentDidMount() {
  }
  
  render() {
      return (
          <div className="Chat">
            <p> Chat </p>
            <ChatMessageList />
            <SendMessageForm />
          </div>
      );
  }
}

export default Chat;
