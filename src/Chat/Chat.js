import React, { Component } from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ChatMessageList from './ChatMessageList.js'
import SendMessageForm from './SendMessageForm.js'
import Contacts from './Contacts.js'
import APICallsToChatkit from './APICallsToChatkit.js'
import ChatUserMapping from './ChatUserMapping.js'
import RoomHandler from './RoomHandler.js'
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
      this.apiCallsToLambda = this.props.apiCallsToLambda;
      this.chatUserMapping = new ChatUserMapping(this.api, this.apiCallsToLambda);
      this.roomHandler = new RoomHandler(this.api);
      this.callbackRefresh = this.callbackRefresh.bind(this);
      this.callbackChangeRoom = this.callbackChangeRoom.bind(this);
  }
  
  async componentDidMount() {
    await this.api.initialize();
    await this.chatUserMapping.initialize();
    await this.api.loginAs(this.props.apiCallsToLambda.getPrimaryUserDetails().username)
    this.setState({
        loading: false
    })    
    this.roomHandler.getRoomsForUser();
  }
  
  async callbackRefresh(){
      await this.api.requestMessagesFromRoom();
      this.setState({
          refresh: true
      })
  }
  
  async callbackChangeRoom(username) {
      await this.roomHandler.switchRoom(username);
      await this.api.setCurrentChannel(this.roomHandler.getCurrentRoomId());
      this.setState({
          refresh: true
      }) 
  } 
  
  
  render(){  
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
        this.apiCallsToLambda.alive();     
        data =
                <div>
                <GridList cellHeight={250} spacing={1}>
                    <GridListTile>
                       <Contacts className="Contacts" callbackChangeRoom={this.callbackChangeRoom} api={this.api} userMapping={this.chatUserMapping}/>
                       <GridListTileBar title={'Contacts'}/>
                    </GridListTile>
                    
                    <GridListTile>
                        <ChatMessageList name="ChatMessageList" api={this.api} chatState={this.state} userMapping={this.chatUserMapping}/>
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
