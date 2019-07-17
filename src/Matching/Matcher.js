import React from 'react';
import { Button, Icon } from 'semantic-ui-react'

import './../CSSAnimation.js';

import './Matcher.css';
import 'animate.css';

import animateElement from './../CSSAnimation.js';


class MatchMe extends React.Component {

    constructor(props) {

        super(props);

        this.onClickSwipeLeft = this.onClickSwipeLeft.bind(this);
        this.onClickSwipeRight = this.onClickSwipeRight.bind(this);
        this.onClickClose = this.onClickClose.bind(this);
        this.startChatting = this.startChatting.bind(this);

    }
    
    // implementing the swipe left or right function

    async onClickSwipeLeft() {
        await animateElement('.matching-div', 'fadeOutRight', 800, function () {
            animateElement('.matching-div', 'fadeInDown');
        });

        if (this.props.swipeLeftCallback !== undefined) {
            this.props.swipeLeftCallback();
        }

    }

    async onClickSwipeRight() {
        await animateElement('.matching-div', 'fadeOutLeft', 800, function () {
            animateElement('.matching-div', 'fadeInDown');
        });

        if (this.props.swipeRightCallback !== undefined) {
            this.props.swipeRightCallback();
        }
    }
    
    // enabling to be able to close the recommendation window

    onClickClose() {
        console.log("close recommendation window");

        if (this.props.closeCallback !== undefined) {
            this.props.closeCallback();
        }
    }

    startChatting(){
        this.props.openChatWithNewFriendCallback(this.props.recommendation['name'],this.props.recommendation['secretId'])
        this.props.closeCallback();
    }
    
    
    // presentation of the name, industry and functionality beneath the recommended user
    // button (yes/no) displayment

    render() {

        let recData = {};

        if (this.props.recommendation === {} || this.props.recommendation === undefined || this.props.recommendation === null) {
            return (
                <div className='matching-div'>
                    <table align='center' className='matching-table'>
                        <tbody>
                            <tr>
                                <td colSpan='2'>
                                    <div className="name-label">
                                        No recommendations left!
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='2'>
                                    <div className="industry-label">
                                        ***
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='2'>
                                    <div className="functionality-label">
                                        Please try again later.
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button onClick={this.onClickClose} color='red'>
                                        Close
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
        

        recData = {
            'name': this.props.recommendation['name'],
            'industry': this.props.recommendation['industry'],
            'functionality': this.props.recommendation['functionality']
        }

        return (

            <div className='matching-div'>
                <table align='center' className='matching-table'>
                    <tbody>
                        <tr>
                            <td colSpan='2'>
                                <div className="name-label">
                                    {recData['name']}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2'>
                                <div className="industry-label">
                                    Industry: {recData['industry']}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2'>
                                <div className="functionality-label">
                                    Functionality: {recData['functionality']}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>

                            </td>
                        </tr>
                        <tr align='center'>
                            <td width='50%'>
                                <Button onClick={this.onClickSwipeLeft} animated='vertical'>
                                    <Button.Content hidden>
                                        <font color="green">Yes!</font>
                                    </Button.Content>
                                    <Button.Content visible>
                                        <Icon name='thumbs up outline' color='green' size='large' />
                                    </Button.Content>
                                </Button>
                            </td>
                            <td width='50%'>
                                <Button onClick={this.onClickSwipeRight} animated='vertical'>
                                    <Button.Content hidden>
                                        <font color="red">No!</font>
                                    </Button.Content>
                                    <Button.Content visible>
                                        <Icon name='thumbs down outline' color='red' size='large' />
                                    </Button.Content>
                                </Button>
                            </td>
                        </tr>                        
                    </tbody>                    
                </table>

                <Button onClick={this.startChatting} className='startChattingButton' variant="primary">
                    Start chatting now!
                </Button>
                
            </div>

        );
    }
}

export default MatchMe;

// default export of the file
