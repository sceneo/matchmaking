import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

/// contact list as class component
class Contacts extends React.Component {
    constructor(props){
        super(props);
        this.api = this.props.api;
        this.userMapping = this.props.userMapping;
        this.callbackChangeRoom = this.props.callbackChangeRoom;
        this.messageHandler = this.props.messageHandler;
    }
    
    componentDidMount(){
        this.timer = setInterval(()=> this.update(), 1000);
    }
    
    update(){
        console.log('update contacts');
        this.forceUpdate();
    }
    
    componentWillReceiveProps(nextProps){
        this.userMapping.updateOnlineStatus();
        this.setState(nextProps.chatState);
        this.forceUpdate();
    }
    
    
/// check online/offline status through userMapping
    getStatus(username){
        if(this.userMapping.getUserByUsername(username).isOnline) {
            return 'online';
        }       
        return 'offline';
    }
    
    changeRoom(username){
        this.callbackChangeRoom(username);
    }
/// list of contacts as shown on web page
    render() {
        
        return (
          <List dense className='ContactList'>
          {this.userMapping.getFriends().map(value => {
              return (
                <ListItem style={{overflow: 'auto'}}  onClick={() => this.changeRoom(value.matchMakingDetails.username)} key={value.matchMakingDetails.username} button>
                  <ListItemAvatar>
                      <Avatar src={require('../img/avatar/' + value.matchMakingDetails.avatar + '.jpg')}/>
                  </ListItemAvatar>
                  <ListItemText primary={value.matchMakingDetails.username} />
                  {!this.messageHandler.hasUnreadMessages(value.matchMakingDetails.username) ? (
                      <ListItemAvatar>
                          <Avatar  src={require('../img/message/unread.jpg')}/>
                      </ListItemAvatar>
                    ) : ""
                  }
                  
                  
                  <ListItemAvatar>
                      <Avatar  src={require('../img/status/' + this.getStatus(value.matchMakingDetails.username) + '.png')}/>
                  </ListItemAvatar>
                </ListItem>
              );
            })}
          </List>
        );
      } 
}

export default Contacts