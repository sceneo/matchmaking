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

        
    }


    render() {
    
        return (
          <List dense className='ContactList'>
          {this.api.getUsers().map(value => {
              return (
                <ListItem key={value.name} button>
                  <ListItemAvatar>
                      <Avatar src={require('../img/avatar/0' + Math.floor(Math.random() * Math.floor(10)) + '.jpg')}/>
                  </ListItemAvatar>
                  <ListItemText primary={value.name} />
                </ListItem>
              );
            })}
          </List>
        );
      } 
}

export default Contacts