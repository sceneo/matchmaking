import React, { Component } from "react";

import Nav from 'react-bootstrap/Nav'


import ChatMessageList from './ChatMessageList.js'
import SendMessageForm from './SendMessageForm.js'
import Contacts from './Contacts.js'


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
  } 
  
  
  xmlToJson(xml) {
      
      // Create the return object
      var obj = {};

      if (xml.nodeType == 1) { // element
          // do attributes
          if (xml.attributes.length > 0) {
          obj["@attributes"] = {};
              for (var j = 0; j < xml.attributes.length; j++) {
                  var attribute = xml.attributes.item(j);
                  obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
              }
          }
      } else if (xml.nodeType == 3) { // text
          obj = xml.nodeValue;
      }
      return obj;
  };
  
  
  getToken(){
      

      var obj = new Object();
      obj.grant_type = this.secretKey;
      obj.user_id = 'test1';
      
      
      
      
      
      
//      const http = new XMLHttpRequest();
//      http.open("POST", this.tokenProvider, true);
//      http.setRequestHeader('Content-Type','application/json, charset=utf8');
//      

//      
//      var obj = new Object();
//      obj.grant_type = this.secretKey;
//      obj.user_id = 'test1';
//           
//    
//      http.onreadystatechange=(e)=>{
//      
//          console.log(http.responseText)
//     
//     //     this.access_token = jsonResponse['access_token'];
//          
//          
////          parseJSON: function(req, url) {  
////          if (req.status == 200) {  
////              var jsonResponse = req.responseJSON;  
////              var bitlyUrl = jsonResponse.results[url].shortUrl;  
////          }
//          
//          
//          
////          console.log(http.response)
//          
//          
//      }
//      
//      console.log("Token created: " + this.access_token)
  }
  
  componentDidMount() {
      
      this.getToken();
      

/*    Sendbird call (unfortunately, only a free account...)
      const http = new XMLHttpRequest();
      http.open("GET", 'https://api-B9F598DF-FB27-41F3-8D36-40CE53B9EF25.sendbird.com/v3/open_channels/Lobby/messages');
      http.setRequestHeader('Content-Type','application/json, charset=utf8');
      http.setRequestHeader('Api-Token','af0ef8246fe01627330b5f74b20d001bcc91adc6')    
      http.send();
      http.onreadystatechange=(e)=>{
          console.log(http.response)
      }
*/
      

      
      
      
      
           
      
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
