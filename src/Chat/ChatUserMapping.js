class ChatUserMapping {
         
   constructor(chatkitApi, lambdaApi) {
       this.verbose = 0;
       this.apiChatkit = chatkitApi;
       this.apiLambda = lambdaApi;
       this.currentUser = 'MatchMaking';
       this.allUsersChatkit = [];
       this.userInventory = [];
       this.friends= [];
   }
   
   setCurrentUser(user){
       this.currentUser = user;
   }
 // user mapping, showing the "friendslist" and online status of users
   getFriends(){
       
  
       for(var user in this.userInventory) {
           this.friends.push(user);
       }
       
       return this.getUserInventory();
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
   
   
   async initialize(){
       this.allUsersChatkit = await this.apiChatkit.getUsers();
       await this.apiLambda.requestListOfOnlineUsers();
       
       if(this.verbose > 0) {
           console.log("initialize");
       }
       for(var user in this.allUsersChatkit){
           await this.apiLambda.requestUserDetailsByUsername(this.allUsersChatkit[user].id);
           
//create object containing the information from Chatkit and the Lambda and fill to userInventory
           var chatkitDetails = this.allUsersChatkit[user];
           if(this.verbose > 0) {
               console.log('secondary details')
           }
           var matchMakingDetails = this.apiLambda.getSecondaryUserDetails();
           if(matchMakingDetails === null) {
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