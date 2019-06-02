class MatchHandler {


    constructor() {
        this.url = 'localhost:3000/matchme';
        this.recsList = [];
        this.userId = 0;
        this.currentProposalIndex = 0;
    }

    setUrl(url_) {
        this.url = url_;
    }


    setUserId(id_) {
        this.userId = id_;
    }


    async retrieveRecommendationList() {
        /*
            trigger rest call to retrieve recommendation list for logged in user (again)
        */

        // for testing purposes
        this.recsList = [
            {
                'id': 32,
                'name': 'Hugo Cheffe',
                'industry': 'Fashion',
                'functionality': 'Master of disaster',
            },
            {
                'id': 11,
                'name': 'Karl Storagefield',
                'industry': 'Music',
                'functionality': 'Maskottchen',
            }
        ];

        this.currentProposalIndex = 0;
    }


    swipe(swipeAction) {

        if (this.currentProposalIndex < this.recsList.length) {
            this.currentProposalIndex += 1;
        }

        if (swipeAction === 'left') {
            // update user and training data: user not interested in recommendation
        } else {
            // update user and training data: user interested in recommendation
            // in particular: add current recommendation to contact list of logged in user  
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