import React from 'react';
import './App.css';
import Login from "./UserIdentity/Login.js"
import Register from "./UserIdentity/Register.js"
import PasswordForgotton from "./UserIdentity/PasswordForgotton.js"
import Chat from "./Chat/Chat.js"

import Matcher from './Matching/Matcher.js';
import MatchHandler from './Matching/MatchHandler.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            forgot: false,
            auth: false,
            userId: null,
            recommendationData: {},
        }

        this.callbackRegister = this.callbackRegister.bind(this);
        this.callbackForgot = this.callbackForgot.bind(this);
        this.callbackAuth = this.callbackAuth.bind(this);

        this.beginMatching = this.beginMatching.bind(this);

        this.matchHandler = new MatchHandler();
    }


    callbackRegister(status) {
        this.setState({
            register: status,
            auth: false
        })
    }

    async callbackAuth(status, user) {

        let recData = {};
        if (status === true) {
            // retrieve recommendation list
            this.matchHandler.setUserId(user);
            await this.matchHandler.retrieveRecommendationList();
            recData = this.matchHandler.getRecommendation();
        }

        this.setState({
            auth: status,
            register: !status,
            userId: user,
            recommendationData: recData,
        })
    }

    callbackForgot() {
        this.setState({
            register: false,
            forgot: true,
            auth: false
        })
    }


    beginMatching() {
        console.log("Now the matching begins...");
    }



    render() {


        if (this.state.register) {
            return (
                <div>
                    <Register />
                </div>
            )
        }

        if (this.state.forgot) {
            return (
                <div>
                    <PasswordForgotton />
                </div>
            )
        }

        if (this.state.auth) {
            return (
                <div>
                    <div>
                        <Chat />
                    </div>
                    <div>
                        <button onClick={this.beginMatching}>Match Me!</button>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Login callbackAuth={this.callbackAuth} callbackForgot={this.callbackForgot} callbackRegister={this.callbackRegister} />
            </div>



        )

    }
}


export default App;
