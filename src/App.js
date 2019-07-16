import React from 'react';
import './App.css';
// Import components from other files
import Login from "./UserIdentity/Login.js"
import Register from "./UserIdentity/Register.js"
import PasswordForgotton from "./UserIdentity/PasswordForgotton.js"
import Chat from "./Chat/Chat.js"
import APICallsToLambda from "./UserIdentity/APICallsToLambda.js"
import HowTo from "./Details/HowTo.js"
import Details from "./Details/Details.js"

import Matcher from './Matching/Matcher.js';
import MatchHandler from './Matching/MatchHandler.js';

// import additional react components from official Semantic-UI-React integration.
import { Button, Segment, Sidebar, Icon } from 'semantic-ui-react';

// Here we can’t use this in a constructor until after we’ve called the parent constructor.
// Refer to parent class constructor via super(props)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            forgot: false,
            auth: false,
            details: false,
            howTo: false,
            userId: '',
            matchMeVisible: false,
            chatUserName: 'Lobby',
            recommendationData: {},
        }
        this.apiCallsToLambda = new APICallsToLambda(); 
        
// With bind() we can assign any context to the functions. 
// The first parameter acts as a new context "this". 
// Additional parameters can be passed to the function. 
// Very important: The bind() method does not call the function, but creates a new function.

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
        this.openChatWithNewFriendCallback = this.openChatWithNewFriendCallback.bind(this);

        this.updateRecommendation = this.updateRecommendation.bind(this);

        this.buttonHowTo = this.buttonHowTo.bind(this);
        this.buttonDetails = this.buttonDetails.bind(this);
        this.buttonChat = this.buttonChat.bind(this);
    }
    
    buttonHowTo(){
        this.setState({
            register: false,
            forgot: false,
            auth: true,
            details: false,
            howTo: true,
            matchMeVisible: false
        })
    }
    
    buttonDetails(){
        this.setState({
            register: false,
            forgot: false,
            auth: true,
            details: true,
            howTo: false,
            matchMeVisible: false
        })
    }
    
    buttonChat() {
        this.setState({
            register: false,
            forgot: false,
            auth: true,
            details: false,
            howTo: false,
            matchMeVisible: false,
            chatUserName: 'Lobby'
        })
    }
    

// With a callback function as argument, not the result of the function x is passed to function y.
// But the function itself, which is then executed at any other position.

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
            this.matchHandler.setUserId(user['secretId']);
            await this.matchHandler.retrieveRecommendationList();
            recData = await this.matchHandler.getRecommendation();
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
            matchMeVisible: false,
            details: false,
            howTo: false
        })
    }

    callbackForgot() {
        this.setState({
            register: false,
            forgot: true,
            auth: false,
            details: false,
            howTo: false,
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
    
    openChatWithNewFriendCallback(name,secretId){
        this.apiCallsToLambda.addToWhitelist(secretId);
        this.setState({ chatUserName: name})
    }

    async updateRecommendation() {
        let recData = await this.matchHandler.getRecommendation();
        this.setState({
            recommendationData: recData
        });
    }
 // Providing Logout functionality via Lambda
    
    logout(){
        this.apiCallsToLambda.logout();
        this.setState({
            register: false,
            forgot: false,
            auth: false,
            matchMeVisible: false,
            details: false,
            howTo: false,
        })   
    }

// Depending on the status assigned, different functions are executed.
    
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
// After successful authentication, the main page is played, which is structured as follows:
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
                                                
                                            <Button primary onClick={this.buttonChat}>
                                                Chat
                                            </Button>
                                            
                                            <Button primary onClick={this.buttonDetails}>
                                                My Details   
                                            </Button>    
                                            <Button primary onClick={this.buttonHowTo}>
                                                How it works
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
                                        swipeRightCallback={this.swipeRightCallback} 
                                        openChatWithNewFriendCallback={this.openChatWithNewFriendCallback} />
                                </div>
                            </Sidebar>

                            <Sidebar.Pusher dimmed={this.state.matchMeVisible}>
                            
                                {!this.state.howTo && !this.state.details ? (
                                    <Segment basic>
                                        <div className='container-div'>
                                            <Chat appState={this.state} apiCallsToLambda={this.apiCallsToLambda} state={this.state}/>
                                        </div>
                                    </Segment>
                                        ) : ""
                                }
                                    {this.state.howTo ? (
                                        <Segment basic>
                                            <div className='container-div'>
                                                <HowTo hidden={false}/>
                                            </div>
                                        </Segment>
                                            ) : ""
                                    }
                                    {this.state.details ? (
                                        <Segment basic>
                                            <div className='container-div'>
                                                <Details apiCallsToLambda={this.apiCallsToLambda} />
                                            </div>
                                        </Segment>
                                            ) : ""
                                    }
                                    
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
// There is one default export per file --> extendede React component App
