import React from 'react';
import './App.css';
import Login from "./Login.js"
import Register from "./Register.js"
import Chat from "./Chat.js"

class App extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            register: false,
            auth: false
        }

        this.callbackRegister = this.callbackRegister.bind( this );
        this.callbackAuth = this.callbackAuth.bind( this );
    }


    callbackRegister( status ) {
        this.setState( {
            register: status,
            auth: false
        } )
    }

    callbackAuth( status ) {
        this.setState( {
            auth: status,
            register: !status
        } )
    }



    render() {
        if ( this.state.register ) {
            return (
                <div>
                    <Register />
                </div>
            )
        }

        if ( this.state.auth ) {
            return (
                <div>
                    <Chat />
                </div>
            )
        }


        return (
            <div>
                <Login callbackAuth={this.callbackAuth} callbackRegister={this.callbackRegister} />
            </div>
        )

    }
}


export default App;
