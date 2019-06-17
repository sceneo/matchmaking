import React from "react";

class SendMessageForm extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.api = this.props.api; 
    }
    
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    
    async handleSubmit(e) {
        e.preventDefault()
        this.submit();
        await this.api.submitMessage(this.state.message)
        await this.api.requestMessagesFromRoom();
        this.setState({
            message: ''
        })
        this.props.callbackRefresh();
    }
    
    async submit() {
    
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