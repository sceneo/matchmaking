import React, { Component } from "react";

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
        const items = this.messages.map(function(item){
            return <li> From: {item.user_id}, Message: {item.parts[0].content} </li>;
          });
        
        return (
                <div>
                <h1>Chat</h1>
                <ul>
                  {items}
                </ul>
                </div>

        )
    }
}

export default ChatMessageList;