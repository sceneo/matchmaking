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

    handleMatchMeShowClick = () => this.setState({ visible: true })
    handleMatchMeHide = () => this.setState({ visible: false })


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

            <div>
                <table align='center'>
                    <tbody>
                        <tr>
                            <td colspan='2' align='center' heigh='100'>
                                <div className="name-label">
                                    {recData['name']}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan='2' align='center' heigh='100'>
                                <div className="industry-label">
                                    {recData['industry']}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan='2' align='center' heigh='100'>
                                <div className="functionality-label">
                                    {recData['functionality']}
                                </div>
                            </td>
                        </tr>
                        <tr align='center'>
                            <td width='50%'>
                                Swipe left
                            </td>
                            <td width='50%'>
                                Swipe right
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        );
    }
}

export default MatchMe;
