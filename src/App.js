import React from 'react';
import './App.css';

class App extends React.Component {
    constructor( props ) {
        super( props );
                this.state = {
                        chatName: ''
                    }
    }
    
    
  render() {
      return(
        <div>
        
            <p>
                This is the main App page
            </p>
                
                import * as SendBird from 'sendbird';
                var sb = new SendBird({'appId': 'APP_ID'});


        </div>
      )

  }
}


export default App;
