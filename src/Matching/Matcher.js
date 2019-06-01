/*  call backend service
    get list of possible matches
    for each match get user info
    show match
    swipe left or right
    submit selection to backend
    if click in middle, open chat 
*/

import React from 'react';
import { Button, Icon } from 'semantic-ui-react'

import './Matcher.css';


class MatchMe extends React.Component {

    constructor(props) {

        super(props);

        this.onClickSwipeLeft = this.onClickSwipeLeft.bind(this);
        this.onClickSwipeRight = this.onClickSwipeRight.bind(this);

    }

    onClickSwipeLeft() {
        console.log("swipe left clicked");

        if (this.props.swipeLeftCallback !== undefined) {
            this.props.swipeLeftCallback();
        }
    }

    onClickSwipeRight() {
        console.log("swipe right clicked");

        if (this.props.swipeRightCallback !== undefined) {
            this.props.swipeRightCallback();
        }
    }


    render() {

        let recData = {};

        if (this.props.recommendation === {} || this.props.recommendation === undefined) {
            recData = {
                'name': 'No recommendations left',
                'industry': '***',
                'functionality': '***'
            }
        } else {
            recData = {
                'name': this.props.recommendation['name'],
                'industry': this.props.recommendation['industry'],
                'functionality': this.props.recommendation['functionality']
            }
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
                                    {recData['industry']}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2'>
                                <div className="functionality-label">
                                    {recData['functionality']}
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
                                        <font color="green"><h1>Yes!</h1></font>
                                    </Button.Content>
                                    <Button.Content visible>
                                        <Icon name='thumbs up outline' color='green' size='huge' />
                                    </Button.Content>
                                </Button>
                            </td>
                            <td width='50%'>
                                <Button onClick={this.onClickSwipeRight} animated='vertical'>
                                    <Button.Content hidden>
                                        <font color="red"><h1>No!</h1></font>
                                    </Button.Content>
                                    <Button.Content visible>
                                        <Icon name='thumbs down outline' color='red' size='huge' />
                                    </Button.Content>
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        );
    }
}

export default MatchMe;
