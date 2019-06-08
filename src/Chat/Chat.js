import React, { Component } from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';


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
                <div>
                <GridList cellHeight={250} spacing={1}>
                    <GridListTile>
                        // Contact list
                       <Contacts className="Contacts" api={this.api} />
                       <GridListTileBar title={'Contacts'}/>
                    </GridListTile>
                    
                    <GridListTile>
                    <ChatMessageList name="ChatMessageList" api={this.api} chatState={this.state}/>
                </GridListTile>
                
                    <GridListTile>
                        <SendMessageForm className="SendMessageForm" api={this.api} callbackRefresh={this.callbackRefresh}/>
                    </GridListTile>
                    
                </GridList>
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
