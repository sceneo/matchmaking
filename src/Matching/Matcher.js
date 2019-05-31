/*  call backend service
    get list of possible matches
    for each match get user info
    show match
    swipe left or right
    submit selection to backend
    if click in middle, open chat 
*/

import React from 'react';
import './Matcher.css';


class MatchMe extends React.Component {

    constructor(props) {

        super(props);
    }


    render() {

        if (this.props.recommendation === {} || this.props.recommendation === undefined) {
            return (
                <div>
                    <div className="no-recommendation">
                        No recommendations left... Please try again later!
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div className="name">
                    {this.props.recommendation['name']}
                </div>
                <div className="industry">
                    {this.props.recommendation['industry']}
                </div>
                <div className="functionality">
                    {this.props.recommendation['functionality']}
                </div>
            </div>
        );
    }
}

export default MatchMe;
