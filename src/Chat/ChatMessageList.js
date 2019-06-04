import React, { Component } from "react";

class ChatMessageList extends React.Component {
    constructor(props){
        super(props);
        this.api = this.props.api;
    
    }

    async componentDidMount(){
        await this.api.requestLobbyMessages();
        console.log(this.api.getLobbyMessages())
    }
    
    render() {
        
        const items = this.api.getLobbyMessages().map(function(item){
            return <li> From: {item.user_id} </li>;
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