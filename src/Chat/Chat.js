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
      
  constructor() {
      super()
      
      this.chatInstance = '8a1e4d4b-5933-473f-bd5d-d4893859ffcd';
      this.secretKey = '6fbd13f5-4d17-4a14-b8bb-95d56416bfc2:BehYgWeMTwQ3kzNUUwgfca3lVTfK9/uG4syEM62U3Jc=';
      this.url = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/8a1e4d4b-5933-473f-bd5d-d4893859ffcd/token'
      this.api = 'https://us1.pusherplatform.io/services/chatkit/v4/' + this.chatInstance;
      this.tokenProvider = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/8a1e4d4b-5933-473f-bd5d-d4893859ffcd/token';
      this.access_token = '';
      this.refresh_token = '';
      this.user_id = '';
      
      
      
  } 
    
  async getToken(){
      var obj = new Object();
      obj.grant_type = this.secretKey;
      obj.user_id = 'test1';
      
      
      
      let response = await new Promise(resolve => {
          var json;
          var xhr = new XMLHttpRequest();
          var url = this.tokenProvider;
          xhr.open("POST", url, true);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.onload = function(e) {
              resolve(xhr.response);
            };
          xhr.onreadystatechange = function persist() {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  json = JSON.parse(xhr.responseText);
          //        console.log(json)
              }
          };
          var data = JSON.stringify(obj);
          xhr.send(data);  
      })
      var obj = JSON.parse(response)
      this.access_token = obj.access_token;
      this.refresh_token = obj.refresh_token;
      this.user_id = obj.user_id;
  }
  
  async componentDidMount() {
      
      await this.getToken()
      
  }
  
  render() {

      return (
          <div className="Chat">
            <Contacts />
            <ChatMessageList />
            <SendMessageForm />
          </div>
      );
  }
}

export default Chat;
