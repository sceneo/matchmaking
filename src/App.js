import React from 'react';
import './App.css';
import Login from "./UserIdentity/Login.js"
import Register from "./UserIdentity/Register.js"
import PasswordForgotton from "./UserIdentity/PasswordForgotton.js"
import Chat from "./Chat/Chat.js"

class App extends React.Component {
    constructor( props ) {
        super( props );
                this.state = {
                        register: false,
                        forgot: false,
                        auth: false
                    }
                
        this.callbackRegister = this.callbackRegister.bind( this );
        this.callbackForgot = this.callbackForgot.bind( this );
        this.callbackAuth = this.callbackAuth.bind( this );
    }
       
    
    callbackRegister(status){
        this.setState( {
            register: status,
            auth: false
        } )
    }

    callbackAuth( status ) {
        this.setState( {
            auth: status,
            register: !status
        } )
    }

    callbackForgot() {
        this.setState( {
            register: false,
            forgot: true,
            auth: false
        } )
    }

    
    
  render() {
      
      
      if(this.state.register) {
          return(
              <div>
                  <Register />
              </div>
          )
      }
      
      if(this.state.forgot) {
          return(
              <div>
                  <PasswordForgotton />
              </div>
          )
      }
      
      if(this.state.auth) {
          return(
                  <div>
                      <Chat />
                  </div>
                  )
      }
            
      return(
        <div>               
            <Login callbackAuth={this.callbackAuth} callbackForgot={this.callbackForgot} callbackRegister={this.callbackRegister}/>
        </div>
        
        

      )

  }
}


export default App;
