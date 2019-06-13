class APICallsToLambda{
    
    constructor() {
        this.url_lambdaAuth = 'https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/Prod/MatchMakingAuth';
        this.primaryUserDetails = [];
    }
    
    getPrimaryUserDetails(){
        return this.primaryUserDetails;
    }
    
    
    async getUserDetailsByEmail(emailidentifier = ''){     
        var response = "";
        var details = {
                usecase: 'detailsByEmail',
                email: emailidentifier
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
              this.primaryUserDetails = data;
          })
          
          .catch(function (error) {
            console.log('Request failed', error);
          });
    }
}
export default APICallsToLambda;