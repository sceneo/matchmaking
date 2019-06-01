import React from 'react';
import './App.css';
import Login from "./UserIdentity/Login.js"
import Register from "./UserIdentity/Register.js"
import PasswordForgotton from "./UserIdentity/PasswordForgotton.js"
import Chat from "./Chat/Chat.js"

import Matcher from './Matching/Matcher.js';
import MatchHandler from './Matching/MatchHandler.js';

import { Button, Segment, Menu, Sidebar } from 'semantic-ui-react'



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            forgot: false,
            auth: false,
            userId: null,
            matchMeVisible: false,
            recommendationData: {},
        }

        this.callbackRegister = this.callbackRegister.bind(this);
        this.callbackForgot = this.callbackForgot.bind(this);
        this.callbackAuth = this.callbackAuth.bind(this);

        this.matchHandler = new MatchHandler();

        this.handleMatchMeShowClick = this.handleMatchMeShowClick.bind(this);
        this.handleMatchMeHide = this.handleMatchMeHide.bind(this);

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


    handleMatchMeShowClick() {
        this.setState({ matchMeVisible: true });
        console.log("actually there should be a popup now...");
    }

    handleMatchMeHide() {
        this.setState({ matchMeVisible: false })
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
                    <Button.Group>
                        <Button disabled={this.state.matchMeVisible} onClick={this.handleMatchMeShowClick}>
                            Match Me!
                        </Button>
                    </Button.Group>

                    <Sidebar.Pushable as={Segment}>
                        <Sidebar
                            style={{ width: 500 }}
                            as={Segment}
                            animation='overlay'
                            icon='labeled'
                            inverted
                            onHide={this.handleMatchMeHide}
                            vertical
                            visible={this.state.matchMeVisible}
                        >
                            <div>
                                <Matcher recommendation={this.state.recData} />
                            </div>
                        </Sidebar>

                        <Sidebar.Pusher dimmed={this.state.matchMeVisible}>
                            <Segment basic>
                                <div style={{ height: 400 }}>
                                    <Chat />
                                </div>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
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
