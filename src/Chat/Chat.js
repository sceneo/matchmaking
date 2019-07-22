import React, { Component } from "react";
import GridListTile from '@material-ui/core/GridListTile';
import ChatMessageList from './ChatMessageList.js'
import SendMessageForm from './SendMessageForm.js'
import Contacts from './Contacts.js'
import APICallsToChatkit from './APICallsToChatkit.js'
import ChatUserMapping from './ChatUserMapping.js'
import RoomHandler from './RoomHandler.js'
import MessageHandler from './MessageHandler.js'
import ClipLoader from 'react-spinners/ClipLoader';
import { Segment } from 'semantic-ui-react';
import './Chat.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Chat extends Component {
  constructor(props) {
      super(props)
      this.state = {
              loading: true,
              refreshContacts: false,
              refreshMessages: false
      }  
      this.chatUserName = 'Lobby';
      
      this.api = new APICallsToChatkit(this.state.loading);
      this.apiCallsToLambda = this.props.apiCallsToLambda;
      this.chatUserMapping = new ChatUserMapping(this.api, this.apiCallsToLambda);
      this.messageHandler = new MessageHandler(this.api, this.apiCallsToLambda);
      this.roomHandler = new RoomHandler(this.api, this.messageHandler);
      this.callbackRefresh = this.callbackRefresh.bind(this);
      this.callbackChangeRoom = this.callbackChangeRoom.bind(this);
  }
  
  async componentWillReceiveProps(nextProps) {
//      const { refresh } = this.props;
      await this.apiCallsToLambda.getUserDetailsByEmail(this.apiCallsToLambda.getPrimaryUserDetails().email)
      this.refreshContacts();
      this.forceUpdate();
      this.setState(nextProps.appState);
    }
  
 // make calls to fetch data and use a timer for repeated updates
  
  async componentDidMount() {
    await this.api.initialize();
    await this.chatUserMapping.initialize();
    await this.api.loginAs(this.props.apiCallsToLambda.getPrimaryUserDetails().username)
    this.setState({
        loading: false
    })    
    this.chatUserMapping.setCurrentUser(this.props.apiCallsToLambda.getPrimaryUserDetails().username);
    this.roomHandler.getRoomsForUser();     
    this.messageHandler.init();
    
    this.timer = setInterval(()=> this.update(), 2000);
    this.timer = setInterval(()=> this.updateMessagingSystem(), 10000);
  }
  
  componentWillUnmount() {
      this.timer = null;
  }
  
  async updateMessagingSystem(){
      await this.messageHandler.updateRooms();
      await this.messageHandler.updateMessages();
      await this.messageHandler.checkMessages();
      this.apiCallsToLambda.alive();
  }
      
  
  update(){
      this.chatUserMapping.updateOnlineStatus();
      this.api.requestMessagesFromRoom();
      this.setState({
          refreshMessages: !this.state.refreshMessages,
          refreshContacts: !this.state.refreshContacts
      });
  
  }
  

  refreshMessages(){
      this.setState({refreshMessages: !this.state.refreshMessages})
  }
  
  refreshContacts(){
      this.setState({refreshContacts: !this.state.refreshContacts})          
  }
      
// Refresh of messages and rooms as callback
  
  async callbackRefresh(){
      await this.api.requestMessagesFromRoom();
      this.setState({
          refreshMessages: !this.state.refreshMessages
      })
  }
  
  async callbackChangeRoom(username) {
      await this.roomHandler.switchRoom(username);
      await this.api.setCurrentChannel(this.roomHandler.getCurrentRoomId());
      await this.callbackRefresh();
      this.apiCallsToLambda.alive();
      
      if(this.messageHandler.hasUnreadMessages(username)) {

          await this.api.requestLatestMessagesFromRoom(this.roomHandler.getCurrentRoomId())
          this.refreshContacts();
      }
  } 
  
// scrolling functionality - ElementID refers to date of message  
  scrollToBottom() {
      var objDiv = document.getElementById("messages");
      objDiv.scrolltop = objDiv.scrollheight;
  }
  
// building chat windows  
  render(){  
      if(this.props.state.chatUserName !== "Lobby" && this.chatUserName !== this.props.state.chatUserName) {
          this.roomHandler.switchRoom(this.props.state.chatUserName);
          this.api.setCurrentChannel(this.roomHandler.getCurrentRoomId());
          this.props.callbackSetChatUserName(this.chatUserName)
      }
      
      
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
                <Segment.Group horizontal borderless class="ui borderless menu" style={{ lineWidth: 0, overflow: 'auto', maxHeight: '40em', border: '0px' }}>
                  <Segment.Group vertical class="ui borderless menu">
                                    
                  <AppBar position="static" color="default">
                   <Toolbar>
                    <Typography variant="h6" color="inherit">
                      Contacts
                    </Typography>
                   </Toolbar>
                  </AppBar>
                  
                  
                  <Segment basic borderless style={{ lineWidth: 0, overflow: 'auto', maxHeight: '35em', width: '25em', border: '0px' }}>
                      <GridListTile  className="grid-list-style">
                       <Contacts className="Contacts" chatState={this.state} refresh={this.refreshContacts} callbackChangeRoom={this.callbackChangeRoom} api={this.api} userMapping={this.chatUserMapping} messageHandler={this.messageHandler}/>
                      </GridListTile> 
                    </Segment>
                  </Segment.Group>
                  
                    <Segment basic borderless style={{lineWidth: 0, maxHeight: '27em', width: '30em', border: '0px' }}>

                      <AppBar position="static" color="default">
                      <Toolbar>
                       <Typography variant="h6" color="inherit">

                          Your chat with {this.roomHandler.getChatPartner()}
       

                         
                       </Typography>
                      </Toolbar>
                     </AppBar>
                       <span style= {{height: '8em'}}>
                         <GridListTile name="messages" scrollheight className="grid-list-style">
                         <ChatMessageList className="ChatMessageList" chatState={this.state} refresh={this.refreshMessages} api={this.api} userMapping={this.chatUserMapping} roomId={this.roomHandler.getCurrentRoom()} />     
                           </GridListTile>
                      </span>
                      <span>
                        <SendMessageForm className="SendMessageForm" api={this.api} callbackRefresh={this.callbackRefresh}/>
                      </span>
                   </Segment>


                   
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
