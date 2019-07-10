import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

// introduce message list as component
// call constructor before component is mounted

class ChatMessageList extends React.Component {
    constructor(props){
        super(props);
        this.api = this.props.api;
        this.messages = this.api.getRoomMessages();
        this.userMapping = this.props.userMapping;
        this.state = this.props.chatState;
        this.roomId = this.props.roomId;
    }
    
    componentWillReceiveProps(nextProps){
        this.messages = this.api.getRoomMessages();
        this.forceUpdate();
        this.setState(nextProps.chatState);
    }

    async componentDidMount(){
    }
    
    getKey(){
        return Math.random();
    }
 // refresh for messages, get avatar and sort messages by date by calling functions via 'this'
    async refresh(){
        await this.api.requestMessagesFromRoom();
        this.render();
    }
    
    getAvatar(username){
        return this.userMapping.getUserByUsername(username).matchMakingDetails.avatar;
    }
    
    sortMessages(){
        if(this.messages !== null && this.messages !== '' && this.messages !== undefined) {
            this.messages.sort(function(a, b) {
                return a.id > b.id;
            });
        }
    }
// List of messages that is then shown in chat        
    render() {       
        
        
        
        this.sortMessages();
        
        return (
          <List dense className='MessageList'>
            {this.messages.map(value => {                              
              return (
                           
                      <ListItem key={this.getKey()} alignItems="flex-start">
                      <ListItemAvatar>
                          <Avatar src={require('../img/avatar/' + this.getAvatar(value.user_id) +  '.jpg')}/>
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