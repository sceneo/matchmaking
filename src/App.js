import React from 'react';
import './App.css';
import Login from "./Login.js"
import Register from "./Register.js"

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
        
            <Register />
        
        </div>
      )

  }
}


export default App;
