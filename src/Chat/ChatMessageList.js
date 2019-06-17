import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class ChatMessageList extends React.Component {
    constructor(props){
        super(props);
        this.api = this.props.api;
        this.messages = this.api.getLobbyMessages();
        this.userMapping = this.props.userMapping;
        this.state = this.props.chatState;
    }
    
    componentWillReceiveProps(nextProps){
        this.messages = this.api.getLobbyMessages();
        this.forceUpdate();
        this.setState(nextProps.chatState);
    }

    async componentDidMount(){


    }
    
    getKey(){
        return Math.random();
    }
    
    async refresh(){
        await this.api.requestMessagesFromRoom();
        this.render();
    }
    
    getAvatar(username){
        return this.userMapping.getUserByUsername(username).matchMakingDetails.avatar;
    }
    
        
    render() {       
        
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