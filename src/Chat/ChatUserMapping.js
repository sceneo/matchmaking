class ChatUserMapping {
         
   constructor(chatkitApi, lambdaApi) {
       this.apiChatkit = chatkitApi;
       this.apiLambda = lambdaApi;
       this.allUsersChatkit = [];
       this.userInventory = [];
   }
   
   
   getUserInventory(){
       return this.userInventory;
   }
   
   
   async initialize(){
       this.allUsersChatkit = await this.apiChatkit.getUsers();
       await this.apiLambda.requestListOfOnlineUsers();
       
       for(var user in this.allUsersChatkit){
           await this.apiLambda.getUserDetailsByUsername(this.allUsersChatkit[user].id);
           
           //create object containing the information from Chatkit and the Lambda and fill to userInventory
           var chatkitDetails = this.allUsersChatkit[user];
           var matchMakingDetails = this.apiLambda.getSecondaryUserDetails();
           var isOnline = false;
           if( this.apiLambda.getListOfOnlineUsers().includes(matchMakingDetails.email)) {
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
       return this.userInventory.find(details => details.matchMakingDetails.username == username)
   }
   
   
}
export default ChatUserMapping;