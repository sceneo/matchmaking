import React from 'react';
import './App.css';
import Login from "./Login.js"

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
        
            <Login />
        
        </div>
      )

  }
}


export default App;
