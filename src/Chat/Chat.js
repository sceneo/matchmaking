import React, { Component } from "react";

import Nav from 'react-bootstrap/Nav'


import ChatMessageList from './ChatMessageList.js'
import SendMessageForm from './SendMessageForm.js'
import Contacts from './Contacts.js'

import './Chat.css';


class Chat extends Component {

    
// Chat Kit Credentials
// v1:us1:8a1e4d4b-5933-473f-bd5d-d4893859ffcd
// 6fbd13f5-4d17-4a14-b8bb-95d56416bfc2:BehYgWeMTwQ3kzNUUwgfca3lVTfK9/uG4syEM62U3Jc=
// https://us1.pusherplatform.io/services/chatkit_token_provider/v1/8a1e4d4b-5933-473f-bd5d-d4893859ffcd/token
      
  constructor(props) {
      super(props)
      this.authorization = this.props.authorization;
   
  }
  
  componentDidMount() {
      
      
  }
  
  render() {
      


      return (
          <div className="Chat">
            <Contacts />
            <ChatMessageList />
            <SendMessageForm authorization={this.authorization}/>
          </div>
      );
  }
}

export default Chat;
