class ChatUserMapping {
         
   constructor(chatkitApi, lambdaApi) {
       this.verbose = 0;
       this.apiChatkit = chatkitApi;
       this.apiLambda = lambdaApi;
       this.currentUser = 'MatchMaking';
       this.allUsersChatkit = [];
       this.allUsersLambda = [];
       this.userInventory = [];
       this.friends= [];
   }
   
   setCurrentUser(user){
       this.currentUser = user;
   }
 // user mapping, showing the "friendslist" and online status of users
   getFriends(){
       this.friends = [];
       for(var i = 0; i < this.userInventory.length; i++) {
           if(this.apiLambda.getPrimaryUserDetails().whitelist.includes(this.userInventory[i].matchMakingDetails.email)) {
               this.friends.push(this.userInventory[i]);
           }
       }
       return this.friends;
   }
   
   getUserInventory(){
       return this.userInventory;
   }
// retrieving list of online users from lambda.auth   
   
   async updateOnlineStatus(){
       if(this.verbose > 0) {
           console.log('updating online status');
       }
       await this.apiLambda.requestListOfOnlineUsers();
       
       if(this.verbose > 0) {
           console.log(this.userInventory);
       }
       for(var i = 0; i < this.userInventory.length; i++) {
           if(this.userInventory[i].matchMakingDetails === null) {
               continue;
           }
           this.userInventory[i].isOnline = false;
           if( this.apiLambda.getListOfOnlineUsers().includes(this.userInventory[i].matchMakingDetails.email)) {
               if(this.verbose > 0) {
                   console.log( this.userInventory[i].matchMakingDetails.email + ' is online')
               }
               this.userInventory[i].isOnline = true;
           }
       }
       
       
   }
   
   getUserLambdaByUsername(username){
       for(var i = 0; i < this.allUsersLambda.length; i++) {
           if(username === this.allUsersLambda[i].username) {
               return this.allUsersLambda[i];
           }
       }
   }
   
   
   async initialize(){
       this.allUsersChatkit = await this.apiChatkit.getUsers();
       await this.apiLambda.requestFullUserList();
       this.allUsersLambda = this.apiLambda.getFullUserList();
       if(this.verbose > 0) {
           console.log(this.allUsersLambda)
       }
       await this.apiLambda.requestListOfOnlineUsers();
       
       if(this.verbose > 0) {
           console.log("initialize");
       }
       
       for(var user in this.allUsersChatkit){
//           await this.apiLambda.requestUserDetailsByUsername(this.allUsersChatkit[user].id);
//           var matchMakingDetails = this.apiLambda.getSecondaryUserDetails();
           
           var matchMakingDetails = this.getUserLambdaByUsername(this.allUsersChatkit[user].id);
           if(this.verbose > 0) {
               console.log(matchMakingDetails);
           }
           
//create object containing the information from Chatkit and the Lambda and fill to userInventory
           var chatkitDetails = this.allUsersChatkit[user];
           if(this.verbose > 0) {
               console.log('secondary details')
           }

           if(matchMakingDetails === null || matchMakingDetails == undefined) {
               if(this.verbose > 0) {
                   console.log('could not find' + this.allUsersChatkit[user].id)
               }
               continue;
           }

           var isOnline = false;
           if( this.apiLambda.getListOfOnlineUsers().includes(matchMakingDetails.email)) {
               if(this.verbose > 0) {
                   console.log( matchMakingDetails.email + ' is online')
               }
               isOnline = true;
           }
           
           user = {
                   chatkitDetails,
                   matchMakingDetails,
                   isOnline
           }
           this.userInventory.push(user);
       } 
   }
   

   getUserByUsername(username){
       if(this.verbose > 0) {
           console.log('Get user ' + username);
       }
       return this.userInventory.find(details => details.matchMakingDetails.username === username)
   }
   
   
}
export default ChatUserMapping;