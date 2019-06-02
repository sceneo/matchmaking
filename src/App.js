import React from 'react';
import './App.css';
import Login from "./UserIdentity/Login.js"
import Register from "./UserIdentity/Register.js"
import PasswordForgotton from "./UserIdentity/PasswordForgotton.js"
import Chat from "./Chat/Chat.js"

import Matcher from './Matching/Matcher.js';
import MatchHandler from './Matching/MatchHandler.js';

import { Button, Segment, Sidebar, Icon } from 'semantic-ui-react';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            forgot: false,
            auth: false,
            userId: 0,
            matchMeVisible: false,
            recommendationData: {},
        }

        this.authorization = [];

        this.callbackRegister = this.callbackRegister.bind(this);
        this.callbackForgot = this.callbackForgot.bind(this);
        this.callbackAuth = this.callbackAuth.bind(this);

        this.matchHandler = new MatchHandler();

        this.handleMatchMeShowClick = this.handleMatchMeShowClick.bind(this);
        this.handleMatchMeHide = this.handleMatchMeHide.bind(this);

        this.swipeLeftCallback = this.swipeLeftCallback.bind(this);
        this.swipeRightCallback = this.swipeRightCallback.bind(this);

        this.updateRecommendation = this.updateRecommendation.bind(this);

    }


    callbackRegister(status) {
        this.setState({
            register: status,
            auth: false
        })
    }

    async callbackAuth(status, authorization, user) {

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

        this.authorization = authorization;
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
    }

    handleMatchMeHide() {
        this.setState({ matchMeVisible: false })
    }

    swipeLeftCallback() {

        this.matchHandler.swipe('left');
        this.updateRecommendation();
    }

    swipeRightCallback() {

        this.matchHandler.swipe('right');
        this.updateRecommendation();
    }

    updateRecommendation() {
        let recData = this.matchHandler.getRecommendation();
        this.setState({
            recommendationData: recData
        });
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
                <div className='main-page-div'>
                    <table className='menu-bar-table'>
                        <tbody>
                            <tr>
                                <td width='80%'>
                                    <div className='menu-item'>
                                        <Button.Group>
                                            <Button primary disabled={this.state.matchMeVisible} onClick={this.handleMatchMeShowClick}>
                                                Match Me!
                                                </Button>
                                        </Button.Group>
                                    </div>
                                </td>
                                <td align='right'>
                                    <div className='user-info'>
                                        <Icon name='user circle' size='large' />Hello {this.state.userId.toString()}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='content'>
                        <Sidebar.Pushable as={Segment}>
                            <Sidebar
                                style={{ width: 400 }}
                                as={Segment}
                                animation='overlay'
                                icon='labeled'
                                inverted
                                onHide={this.handleMatchMeHide}
                                vertical
                                visible={this.state.matchMeVisible}
                            >
                                <div>
                                    <Matcher recommendation={this.state.recommendationData}
                                        closeCallback={this.handleMatchMeHide}
                                        swipeLeftCallback={this.swipeLeftCallback}
                                        swipeRightCallback={this.swipeRightCallback} />
                                </div>
                            </Sidebar>

                            <Sidebar.Pusher dimmed={this.state.matchMeVisible}>
                                <Segment basic>
                                    <div className='container-div'>
                                        <Chat authorization={this.authorization} />
                                    </div>
                                </Segment>
                            </Sidebar.Pusher>
                        </Sidebar.Pushable>
                    </div >
                </div>
            );
        }

        return (
            <div>
                <Login callbackAuth={this.callbackAuth} callbackForgot={this.callbackForgot} callbackRegister={this.callbackRegister} />
            </div>
        );

    }
}


export default App;
