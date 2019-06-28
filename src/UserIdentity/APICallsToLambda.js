class APICallsToLambda{
    
    constructor() {
        this.url_lambdaAuth = 'https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/Prod/MatchMakingAuth';
        this.primaryUserDetails = [];
        this.secondaryUserDetails = [];
        this.listOfOnlineUsers = '';
        this.registrationState = '';
    }
    
    getPrimaryUserDetails(){
        return this.primaryUserDetails;
    }
    
    getSecondaryUserDetails(){
        return this.secondaryUserDetails;
    }
    
    getListOfOnlineUsers(){
        return this.listOfOnlineUsers;
    }
    
    getRegistrationState(){
        return this.registrationState;
    }
    
    async addToBlacklist(candidate) {
        var details = {
                usecase: 'addToBlacklist',
                email: this.primaryUserDetails.email,
                blacklistCandidate: candidate,
        }
        await fetch(this.url_lambdaAuth,{
            headers: {
            "Content-type": "application/json; utf-8"
            },
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(details)
          })
          .then(response => response.json())          
          .catch(function (error) {
            console.log('Request failed', error);
          });
    }
    
    async addToWhitelist(candidate){
        var details = {
                usecase: 'addToWhitelist',
                email: this.primaryUserDetails.email,
                whitelistCandidate: candidate,
        }
        await fetch(this.url_lambdaAuth,{
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":"*",
            "Content-type": "application/json; utf-8"
            },
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(details)
          })
          .then(response => response.json())          
          .catch(function (error) {
            console.log('Request failed', error);
          });
    }
    
    async logout() {
        var details = {
                usecase: 'logout',
                email: this.primaryUserDetails.email
        }
        await fetch(this.url_lambdaAuth,{
            headers: {
            "Content-type": "application/json; utf-8"
            },
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(details)
          })
          .then(response => response.json())          
          .catch(function (error) {
            console.log('Request failed', error);
          });
// cleanup?
    }
    
    async getUserDetailsByEmail(emailidentifier = ''){     
        var details = {
                usecase: 'detailsByEmail',
                email: emailidentifier
        }
        
        await fetch(this.url_lambdaAuth,{
            headers: {
            "Content-type": "application/json; utf-8"
            },
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(details)
          })
          .then(response => response.json())
          .then(data => {
              this.primaryUserDetails = data;
          })
          
          .catch(function (error) {
            console.log('Request failed', error);
          });
    }
    
    async getUserDetailsByUsername(usernameidentifier = ''){     
        var details = {
                usecase: 'detailsByUsername',
                username: usernameidentifier
        }
        
        await fetch(this.url_lambdaAuth,{
            headers: {
            "Content-type": "application/json; utf-8"
            },
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(details)
          })
          .then(response => response.json())
          .then(data => {
              this.secondaryUserDetails = data;
          })
          
          .catch(function (error) {
            console.log('Request failed', error);
          });
        
    }
    async requestListOfOnlineUsers() {
        var details = {
                usecase: 'listOnline',
        }
        
        await fetch(this.url_lambdaAuth,{
            headers: {
            "Content-type": "application/json; utf-8"
            },
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(details)
          })
          .then(response => response.json())
          .then(data => {
              this.listOfOnlineUsers = data;
          })
          
          .catch(function (error) {
            console.log('Request failed', error);
          });
    }
    
    alive(){
        var details = {
                usecase: 'alive',
                email: this.primaryUserDetails.email
        }
        
        fetch(this.url_lambdaAuth,{
            headers: {
            "Content-type": "application/json; utf-8"
            },
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(details)
          })
    }
    
    async registerNewUser(details) {
        var details = {
            usecase: 'register',
            title: details.title,
            firstName: details.firstName,
            lastName: details.lastName,
            gender: details.gender,
            company: details.company,
            industry: details.industry,
            functionality: details.functionality,
            city: details.city,
            country: details.country,
            type: details.type,
            email: details.email,
            username: details.username,
            password: details.password  
        }
        
        await fetch(this.url_lambdaAuth,{
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":"*",
            "Content-type": "application/json; utf-8"
            },
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(details)
          })
          .then(response => response.json())
          .then(data => {
              console.log(data);
              this.registrationState = data;
          })
          
          .catch(function (error) {
            console.log('Request failed', error);
            this.registrationState = error;
          });
    }
    
}
export default APICallsToLambda;