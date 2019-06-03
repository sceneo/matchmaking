import React, { Component } from "react";
import ChatMessageList from './ChatMessageList.js'
import SendMessageForm from './SendMessageForm.js'
import Contacts from './Contacts.js'
import APICallsToChatkit from './APICallsToChatkit.js'

import ClipLoader from 'react-spinners/ClipLoader';

import './Chat.css';


class Chat extends Component {
  constructor(props) {
      super(props)
      this.api = new APICallsToChatkit();
      this.state = {
              loading: true
      }
   
  }
  
  componentDidMount() {
    this.api.initialize();
    
    console.log(this.api.getAuthorization().access_token)
    
      
  }
  
  render() {
      
      
              
      this.api.getUsers();
      
      
      
      let data;
      if (this.state.loading) {
          data =
                 <div className='sweet-loading'>
                      <ClipLoader
                      sizeUnit={"px"}
                      size={150}
                      color={'#123abc'} />
            </div> 
      } 
      else {
        data =
               <div className="Chat">
                   <Contacts api={this.api}/>
                   <ChatMessageList />
                   <SendMessageForm />
               </div>
      }
                
                
      return (
          <div>
              {data}
          </div>
      );
  }
}

export default Chat;
