import React, { Component } from "react";
import GridListTile from '@material-ui/core/GridListTile';
import ChatMessageList from './ChatMessageList.js'
import SendMessageForm from './SendMessageForm.js'
import Contacts from './Contacts.js'
import APICallsToChatkit from './APICallsToChatkit.js'
import ChatUserMapping from './ChatUserMapping.js'
import RoomHandler from './RoomHandler.js'
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
              refresh: false,
      }  
      
      this.api = new APICallsToChatkit(this.state.loading);
      this.apiCallsToLambda = this.props.apiCallsToLambda;
      this.chatUserMapping = new ChatUserMapping(this.api, this.apiCallsToLambda);
      this.roomHandler = new RoomHandler(this.api);
      this.callbackRefresh = this.callbackRefresh.bind(this);
      this.callbackChangeRoom = this.callbackChangeRoom.bind(this);
  }

 // make calls to fetch data and use a timer to have the data updated every so often without the user ever having to refresh the page.
  
  async componentDidMount() {
    await this.api.initialize();
    await this.chatUserMapping.initialize();
    await this.api.loginAs(this.props.apiCallsToLambda.getPrimaryUserDetails().username)
    this.setState({
        loading: false
    })    
    this.chatUserMapping.setCurrentUser(this.props.apiCallsToLambda.getPrimaryUserDetails().username);
    this.roomHandler.getRoomsForUser(); 
    
    this.timer = setInterval(()=> this.updateOnlineStatus(), 10000);
  }
  
  componentWillUnmount() {
      this.timer = null;
  }
  
  updateOnlineStatus(){
      this.chatUserMapping.updateOnlineStatus();
      this.setState({
          refresh: true
      });
  
  }
      
// Refresh of messages and rooms as callback
  
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
  
// scrolling functionality - ElementID refers to date of message  
  scrollToBottom() {
      var objDiv = document.getElementById("messages");
      objDiv.scrollTop = objDiv.scrollHeight;
  }
  
// building chat windows  
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
                <Segment.Group horizontal borderless class="ui borderless menu">
                  <Segment.Group vertical>
                                    
                  <AppBar position="static" color="default">
                   <Toolbar>
                    <Typography variant="h6" color="inherit">
                      Contacts
                    </Typography>
                   </Toolbar>
                  </AppBar>
                  
                  
                  <Segment basic borderless style={{ lineWidth: 0, overflow: 'auto', maxHeight: '35em', width: '25em', border: '0px' }}>
                      <GridListTile style={{overflow: 'auto'}}>
                       <Contacts className="Contacts" callbackChangeRoom={this.callbackChangeRoom} api={this.api} userMapping={this.chatUserMapping}/>
                      </GridListTile> 
                    </Segment>
                  </Segment.Group>
                  
                    <Segment basic borderless style={{lineWidth: 0, height: '31em', width: '30em', border: '0px' }}>

                      <AppBar position="static" color="default">
                      <Toolbar>
                       <Typography variant="h6" color="inherit">
                         Messages
                       </Typography>
                      </Toolbar>
                     </AppBar>
                       <span style= {{height: '10em'}}>
                         <GridListTile name="messages" scrollHeight style={{lineWidth: 0, overflow: 'auto', maxHeight: '31em' }}>
                         <ChatMessageList name="ChatMessageList" api={this.api} chatState={this.state} userMapping={this.chatUserMapping}/>     
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
