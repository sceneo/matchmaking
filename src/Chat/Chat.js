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
      this.state = {
              loading: true,
              refresh: false
      }  
      
      this.api = new APICallsToChatkit(this.state.loading);
      
      this.callbackRefresh = this.callbackRefresh.bind(this);
  }
  
  async componentDidMount() {
    await this.api.initialize();
    this.setState({
        loading: false
    })    
  }
  
  async callbackRefresh(){
      await this.api.requestMessagesFromRoom();
      this.setState({
          refresh: true
      })
  }
  
  
  render() { 
            
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
                   <Contacts className="Contacts" api={this.api} />
                   <ChatMessageList name="ChatMessageList" api={this.api} chatState={this.state}/>
                   <SendMessageForm className="SendMessageForm" api={this.api} callbackRefresh={this.callbackRefresh}/>
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
