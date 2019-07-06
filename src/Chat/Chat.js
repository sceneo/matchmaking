import React, { Component } from "react";
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ChatMessageList from './ChatMessageList.js'
import SendMessageForm from './SendMessageForm.js'
import Contacts from './Contacts.js'
import APICallsToChatkit from './APICallsToChatkit.js'
import ChatUserMapping from './ChatUserMapping.js'
import RoomHandler from './RoomHandler.js'
import ClipLoader from 'react-spinners/ClipLoader';
import { Segment } from 'semantic-ui-react';
import './Chat.css';


class Chat extends Component {
  constructor(props) {
      super(props)
      this.state = {
              loading: true,
              refresh: false,
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
    this.chatUserMapping.setCurrentUser(this.props.apiCallsToLambda.getPrimaryUserDetails().username);
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
  
  
  scrollToBottom() {
      var objDiv = document.getElementById("messages");
      objDiv.scrollTop = objDiv.scrollHeight;
  }
  
  
  render(){  
      let data;
      if (this.state.loading) {
          data =
                 <div className='sweet-loading'>
                      <ClipLoader sizeUnit={"px"} size={50} color={'#123abc'} />
                 </div> 
      } 
      else {
        this.apiCallsToLambda.alive();     
        data =
               <div>
                <Segment.Group horizontal borderless className="ui borderless menu">
                  <Segment.Group vertical>
                    <GridListTileBar actionPosition="right" titlePosition="top" title={'Contacts'}/>
                    <Segment basic borderless style={{ lineWidth: 0, overflow: 'auto', maxHeight: '35em', width: '25em', border: '0px' }}>
                      <GridListTile style={{overflow: 'auto'}}>
                       <Contacts className="Contacts" callbackChangeRoom={this.callbackChangeRoom} api={this.api} userMapping={this.chatUserMapping}/>
                      </GridListTile> 
                    </Segment>
                  </Segment.Group>
                  <Segment.Group vertical>
                    <Segment basic borderless style={{lineWidth: 0, height: '31em', width: '30em', border: '0px' }}>
                      <GridListTileBar actionPosition="right" titlePosition="top" title={'Messages'}/>   
                      <GridListTile name="messages" scrollHeight style={{lineWidth: 0, overflow: 'auto', maxHeight: '31em' }}>
                        <ChatMessageList name="ChatMessageList" api={this.api} chatState={this.state} userMapping={this.chatUserMapping}/>     
                           </GridListTile>
                    </Segment>
                    <Segment>
                        <SendMessageForm className="SendMessageForm" api={this.api} callbackRefresh={this.callbackRefresh}/>
                    </Segment>
                   </Segment.Group>
                </Segment.Group>
                                
                        

  
                                
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
