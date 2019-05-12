import React from 'react';
import './App.css';
import Login from "./Login.js"
import Register from "./Register.js"

class App extends React.Component {
    constructor( props ) {
        super( props );
                this.state = {
                        register: false
                    }
                
        this.callbackRegister = this.callbackRegister.bind( this );
    }
    
    
    callbackRegister(){
        if(this.state.register) {
            this.setState( {
                register: false
            } )
        }
        else {
            this.setState( {
                register: true
            } )            
        }       
    }
    

    
    
  render() {
      if(this.state.register) {
          return(
              <div>
                  <Register />
              </div>
          )
      }
      
      
      
      return(
        <div>               
            <Login callbackRegister={this.callbackRegister}/>
        </div>
      )

  }
}


export default App;
