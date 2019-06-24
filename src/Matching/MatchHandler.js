


class MatchHandler {


    constructor() {
        this.url = 'https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/Prod/MatchMakingAnalytics';
        this.recsList = [];
        this.userId = 0;
        this.currentProposalIndex = 0;
        this.api = [];
        
    }
    
    setApi(api){
        this.api = api;
    }

    setUrl(url_) {
        this.url = url_;
    }


    setUserId(id_) {
        this.userId = id_;
    }


    async retrieveRecommendationList() {
        var details = {
                usecase: 'matchme',
                secretId: this.userId
        }
        
        await fetch(this.url,{
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
              this.recsList = data;
          })
          
          .catch(function (error) {
            console.log('Request failed', error);
          });
        this.currentProposalIndex = 0;
    }


    swipe(swipeAction) {
        var addToList = this.currentProposalIndex;
        if (this.currentProposalIndex < this.recsList.length) {
            this.currentProposalIndex += 1;
        }

        if (swipeAction === 'left') {
            // update user and training data: user not interested in recommendation
            // ==> add user to blacklist
            this.api.addToBlacklist(this.recsList[addToList]['secretId']);
            
        } else {
            // update user and training data: user interested in recommendation
            // in particular: add current recommendation to contact list of logged in user  
            // ==> add user to whitelist
            this.api.addToWhitelist(this.recsList[addToList]['secretId']);
        }

    }


    getRecommendation() {
        if (this.recsList.length === 0 || this.currentProposalIndex >= this.recsList.length) {
            console.log("no recommendations left!");
            return null;
        }

        return this.recsList[this.currentProposalIndex];
    }
}


export default MatchHandler;