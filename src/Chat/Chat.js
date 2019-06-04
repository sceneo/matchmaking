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
              loading: true
      }  
      
      this.api = new APICallsToChatkit(this.state.loading);
  }
  
  async componentDidMount() {
    await this.api.initialize();
    this.setState({
        loading: false
    })

//    await this.api.submitMessage('TestMessage from FE' , '19865469');
//    await this.api.requestLobbyMessages();
    
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
                   <Contacts api={this.api} />
                   <ChatMessageList api={this.api} />
                   <SendMessageForm api={this.api} />
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
