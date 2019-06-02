import React, { Component } from "react";

class SendMessageForm extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.lobby = '19865469';
        
        this.chatInstance = '8a1e4d4b-5933-473f-bd5d-d4893859ffcd';
        this.api = 'https://us1.pusherplatform.io/services/chatkit/v4/' + this.chatInstance;
        this.authorization = this.props.authorization;
        console.log(this.authorization.access_token);
    }
    
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        this.submit();
     //   this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }
    
    async submit() {
        console.log('submitting')
        
        var obj = new Object();
        var message = new Object();
        message.type = 'text/plain';
        message.content = this.state.message
        
        obj.parts = message;
        
        
        
        let response = await new Promise(resolve => {
            var json;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", this.api + '/rooms/:' + this.lobby + '/messages', true);
            xhr.setRequestHeader("Content-Type", "application/json");
            console.log('using token: ' + this.authorization.access_token)
            xhr.setRequestHeader("Authorization", "Bearer " + this.props.authorization.access_token );
            xhr.onload = function(e) {
                resolve(xhr.response);
              };
            xhr.onreadystatechange = function persist() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    json = JSON.parse(xhr.responseText);
                    console.log(json)
                }
                console.log(xhr.responseText)
            };
            var data = JSON.stringify(obj);
            xhr.send(data);  
        })
        
    }
    
    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
            </form>
        )
    }
}

export default SendMessageForm;