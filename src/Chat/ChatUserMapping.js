class ChatUserMapping {
         
   constructor(chatkitApi, lambdaApi) {
       this.apiChatkit = chatkitApi;
       this.apiLambda = lambdaApi;
       this.allUsers = [];
       this.friends = [];
       
   }
   
   
   
   
   async initialize(){
       this.allUsers = await this.apiChatkit.getUsers();
       
       for(var user in this.allUsers){
           
       }
       
       
       
       
       console.log(this.allUsers);
   }
   
   
}
export default ChatUserMapping;