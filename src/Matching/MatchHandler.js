
// set up of the Match Handler for showing actual recommendations to the user

class MatchHandler {


    constructor() {
        this.recsList = [];
        this.userId = 0;
        this.currentProposalIndex = 0;
        this.api = [];
        this.url = 'https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/Prod/MatchMakingAnalytics';
        
    }
    
    setApi(api){
        this.api = api;
    }

    setUserId(id_) {
        this.userId = id_;
    }

    // fetching recommendations list
    
    async retrieveRecommendationList() {
        var details = {
                usecase: 'matchme',
                secretId: this.userId
        }
        
        await fetch(this.url,{
            headers: {
            "Content-type": "application/json; utf-8"
            },
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(details)
          })
          .then(response => response.json())
          .then(data => {
              this.recsList = data;
          })
          
          .catch(function (error) {
            console.log('Request failed', error);
          });
        this.currentProposalIndex = 0;
    }

    // using the matchmaking data to update the training model
    
    async swipe(swipeAction) {
        var addToList = this.currentProposalIndex;
        if (this.currentProposalIndex < this.recsList.length) {
            this.currentProposalIndex += 1;
        }

        if (swipeAction === 'left') {
            // update user and training data: user interested in recommendation
            await this.api.addToWhitelist(this.recsList[addToList]['secretId']);
            
        } 
        else if (swipeAction === 'right') {
            // update user and training data: user not interested 
            await this.api.addToBlacklistt(this.recsList[addToList]['secretId']);
        }
    }

    // when 0 recommendations remain - no more users left to be recommended
    
    async getRecommendation() {
                
        if (this.recsList.length === 0 || this.currentProposalIndex >= this.recsList.length) {
            console.log("no recommendations left!");
            return null;
        }      
        
        // I don t want to have the admin
        if(this.recsList[this.currentProposalIndex].name === 'MatchMaking') {
            this.currentProposalIndex++;
//            console.log("MatchMaking is not a valid recommendation!");
            return this.getRecommendation();
        }
    
        // I don t want to have myself
        if(this.recsList[this.currentProposalIndex].name === this.api.getPrimaryUserDetails().username) {
            this.currentProposalIndex++;
//            console.log("I like myself, but not THAT much...")
            return this.getRecommendation();
        }
  
        // pulling recommendations and their attributes through the API
        var username = this.recsList[this.currentProposalIndex].name;
        await this.api.requestUserDetailsByUsername(username);
        
        
        // I don t  want to have the blacklisted users
        if(this.api.getPrimaryUserDetails().blacklist.includes(this.api.getSecondaryUserDetails().email)) {
            this.currentProposalIndex++;
//            console.log("I do not like this guy...")
            return this.getRecommendation();
        }
        
        // I don t want to have the users I already have in my friend's list
        if(this.api.getPrimaryUserDetails().whitelist.includes(this.api.getSecondaryUserDetails().email)) {
            this.currentProposalIndex++;
//            console.log("I already like this guy...")
            return this.getRecommendation();
        }
        
        
            
        this.recsList[this.currentProposalIndex].functionality = this.api.getSecondaryUserDetails(username).functionality;
        this.recsList[this.currentProposalIndex].gender = this.api.getSecondaryUserDetails(username).gender;
        this.recsList[this.currentProposalIndex].industry = this.api.getSecondaryUserDetails(username).industry;
        this.recsList[this.currentProposalIndex].name = this.api.getSecondaryUserDetails(username).username;
        this.recsList[this.currentProposalIndex].secretId = this.api.getSecondaryUserDetails(username).secretId;
        this.recsList[this.currentProposalIndex].title = this.api.getSecondaryUserDetails(username).title;
        this.recsList[this.currentProposalIndex].type = this.api.getSecondaryUserDetails(username).type;
        
        
        return this.recsList[this.currentProposalIndex];
    }
}


export default MatchHandler;

// default export of the file