import React from 'react';
import './App.css';
import Login from "./UserIdentity/Login.js"
import Register from "./UserIdentity/Register.js"
import PasswordForgotton from "./UserIdentity/PasswordForgotton.js"
import Chat from "./Chat/Chat.js"
import APICallsToLambda from "./UserIdentity/APICallsToLambda.js"


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
            userId: '',
            matchMeVisible: false,
            recommendationData: {},
        }
        
        this.apiCallsToLambda = new APICallsToLambda();      

        this.callbackRegister = this.callbackRegister.bind(this);
        this.callbackForgot = this.callbackForgot.bind(this);
        this.callbackAuth = this.callbackAuth.bind(this);
        this.callbackBackToLogin = this.callbackBackToLogin.bind(this);
        
        this.logout = this.logout.bind(this);

        this.matchHandler = new MatchHandler();
        this.matchHandler.setApi(this.apiCallsToLambda);
        
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

    async callbackAuth(status, user) {
        let recData = {};
        if (status === true) {
            // retrieve recommendation list
            this.userDetails = await this.apiCallsToLambda.getUserDetailsByEmail(user);
            this.matchHandler.setUserId(this.userDetails['secretId']);
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
    
    callbackBackToLogin(){
        this.setState({
            register: false,
            forgot: false,
            auth: false,
            matchMeVisible: false
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
    
    logout(){
        this.apiCallsToLambda.logout();
        this.setState({
            register: false,
            forgot: false,
            auth: false,
            matchMeVisible: false
        })   
    }


    render() {

        if (this.state.register) {
            return (
                <div>
                    <Register callbackBackToLogin={this.callbackBackToLogin}/>
                </div>
            )
        }

        if (this.state.forgot) {
            return (
                <div>
                    <PasswordForgotton callbackRegister={this.callbackRegister} callbackBackToLogin={this.callbackBackToLogin} />
                </div>
            )
        }

        if (this.state.auth) {
            return (
                <div className='main-page-div'>
                    <table className='menu-bar-table'>
                        <tbody>
                            <tr>
                                <td width='10%'>
                                    <div className='menu-item'>
                                        <Button.Group>
                                            <Button primary disabled={this.state.matchMeVisible} onClick={this.handleMatchMeShowClick}>
                                                Match Me!    
                                            </Button>
                                        </Button.Group>
                                    </div>
                                </td>
                                <td width='30%' align='right'>
                                    <div className='user-info'>
                                        <Icon name='user circle' size='large' />Hello {this.apiCallsToLambda.getPrimaryUserDetails()['username']}
                                    </div>
                                </td>
                                <td width='30%' align='right'>
                                  <div className='menu-item'>
                                    <Button.Group>
                                      <Button primary onClick={this.logout}>
                                          Logout    
                                      </Button>
                                    </Button.Group>
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
                                        <Chat apiCallsToLambda={this.apiCallsToLambda} />
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
                <Login callbackAuth={this.callbackAuth} callbackForgot={this.callbackForgot} callbackRegister={this.callbackRegister} apiCallsToLambda={this.apiCallsToLambda} />
            </div>
        );

    }
}


export default App;
