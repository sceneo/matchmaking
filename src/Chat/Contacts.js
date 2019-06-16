import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

class Contacts extends React.Component {
    constructor(props){
        super(props);
        this.api = this.props.api;
        this.userMapping = this.props.userMapping;
        
    }
    
    getStatus(username){
        if(this.userMapping.getUserByUsername(username).isOnline) {
            return 'online';
        }       
        return 'offline';
    }


    render() {
    
        return (
          <List dense className='ContactList'>
          {this.userMapping.getUserInventory().map(value => {
              return (
                <ListItem key={value.matchMakingDetails.username} button>
                  <ListItemAvatar>
                      <Avatar src={require('../img/avatar/' + value.matchMakingDetails.avatar + '.jpg')}/>
                  </ListItemAvatar>
                  <ListItemText primary={value.matchMakingDetails.username} />
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