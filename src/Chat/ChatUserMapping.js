class ChatUserMapping {
         
   constructor(chatkitApi, lambdaApi) {
       this.apiChatkit = chatkitApi;
       this.apiLambda = lambdaApi;
       this.allUsersChatkit = [];
       this.userInventory = [];
   }
   
   
   
   
   async initialize(){
       this.allUsersChatkit = await this.apiChatkit.getUsers();
       for(var user in this.allUsersChatkit){
           await this.apiLambda.getUserDetailsByUsername(this.allUsersChatkit[user].id);
           
           //create object containing the information from Chatkit and the Lambda and fill to userInventory
           
       }     
   }
   
   //TODO
   getUserByUsername(){
       
   }
   
   //TODO
   getUserByEmail(){
       
   }
   
}
export default ChatUserMapping;