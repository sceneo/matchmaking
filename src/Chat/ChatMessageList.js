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
        this.state = {
                rerender: false
        }
        this.api = this.props.api;
        this.messages = this.api.getRoomMessages();
        this.userMapping = this.props.userMapping;
        this.state = this.props.chatState;
        this.roomId = this.props.roomId;
    }
  
    
    componentWillReceiveProps(nextProps) {
        const { refresh } = this.props;
        if (nextProps.refresh !== refresh) {
            this.refreshMessages()
        }
//        console.log('refresh messages tried to be called here')
        this.messages = this.api.getRoomMessages();
        this.forceUpdate();
        this.setState(nextProps.chatState);
//        this.setState({
//            rerender: !this.state.rerender
//        })
        
        
        
      }
    
    componentDidMount(){
        this.timer = setInterval(()=> this.update(), 10000);
    }
    
    update(){
        this.setState({
            refresh: true
        })
    }

    async componentDidMount(){
    }
    
    getKey(){
        return Math.random();
    }
    
    
    getAvatar(username){
        return this.userMapping.getUserByUsername(username).matchMakingDetails.avatar;
    }
    
    sortMessages(){
        if(typeof this.messages.sort === 'function') {
            if(this.messages !== null && this.messages !== '' && this.messages !== undefined) {
                this.messages.sort(function(a, b) {
                    return a.id > b.id;
                });
            }
        }
        else {
            if(typeof this.messages.push === 'function') {
                this.messages.push({
                        id: 0,
                        user_id: 1,
                        parts: {
                            0: "No content available",
                    }
                })
            }
            else {
                this.messages = []
            }
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