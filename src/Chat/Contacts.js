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
        this.state = {
                rerender: false
        }
        this.api = this.props.api;
        this.userMapping = this.props.userMapping;
        this.callbackChangeRoom = this.props.callbackChangeRoom;
        this.messageHandler = this.props.messageHandler;
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
    
    
    componentWillReceiveProps(props) {
        const { refresh } = this.props;
        if (props.refresh !== refresh) {
            this.refreshContacts()
        }
        this.setState({
            rerender: !this.state.rerender
        })
      }
    
    
/// list of contacts as shown on web page
    render() {
        
        if(this.state.rerender) {
//            console.log('rerendering contacts')
        }
        
        return (
          <List dense className='ContactList'>
          <ListItem style={{overflow: 'auto'}}  onClick={() => this.changeRoom('Lobby')} key={'Lobby'} button>
              Back to community chat
          </ListItem>
          
          {this.userMapping.getFriends().map(value => {
              return (
                <ListItem style={{overflow: 'auto'}}  onClick={() => this.changeRoom(value.matchMakingDetails.username)} key={value.matchMakingDetails.username} button>
                  <ListItemAvatar>
                      <Avatar src={require('../img/avatar/' + value.matchMakingDetails.avatar + '.jpg')}/>
                  </ListItemAvatar>
                  <ListItemText primary={value.matchMakingDetails.username} />
                  {this.messageHandler.hasUnreadMessages(value.matchMakingDetails.username) ? (
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