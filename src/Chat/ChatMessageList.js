import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class ChatMessageList extends React.Component {
    constructor(props){
        super(props);
        this.api = this.props.api;
        this.messages = this.api.getLobbyMessages();
        this.state = this.props.chatState;
    }
    
    componentWillReceiveProps(nextProps){
        this.messages = this.api.getLobbyMessages();
        this.forceUpdate();
        this.setState(nextProps.chatState);
    }

    async componentDidMount(){


    }
    
    async refresh(){
        await this.api.requestMessagesFromRoom();
        this.render();
    }
    
        
    render() {       
        
        return (
          <List dense className='MessageList'>
            {this.messages.map(value => {
//                console.log(this.messages);
                
              var avatar = '../img/avatar/' + Math.floor(Math.random() * Math.floor(9)) + '.jpg'

                
              return (
                           
                      <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                          <Avatar src={require('../img/avatar/' + Math.floor(Math.random() * Math.floor(10)) + '.jpg')}/>
                      </ListItemAvatar>
                      <ListItemText
                        primary={value.parts[0].content}
                        secondary={
                          <React.Fragment>
                            {value.user_id}
                          </React.Fragment>
                        }
                      />
                    </ListItem>              
              );
            })}
          </List>
        );
      } 
}

export default ChatMessageList;