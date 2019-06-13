class APICallsToChatkit {
    
 // Chat Kit Credentials
 // v1:us1:8a1e4d4b-5933-473f-bd5d-d4893859ffcd
 // 6fbd13f5-4d17-4a14-b8bb-95d56416bfc2:BehYgWeMTwQ3kzNUUwgfca3lVTfK9/uG4syEM62U3Jc=
 // https://us1.pusherplatform.io/services/chatkit_token_provider/v1/8a1e4d4b-5933-473f-bd5d-d4893859ffcd/token
       
   constructor() {
       this.chatInstance = '8a1e4d4b-5933-473f-bd5d-d4893859ffcd';
       this.secretKey = '6fbd13f5-4d17-4a14-b8bb-95d56416bfc2:BehYgWeMTwQ3kzNUUwgfca3lVTfK9/uG4syEM62U3Jc=';
       this.api = 'https://us1.pusherplatform.io/services/chatkit/v4/' + this.chatInstance;
       this.tokenProvider = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/8a1e4d4b-5933-473f-bd5d-d4893859ffcd/token';
       this.authorization = [];
       this.users = [];
       this.lobbyMessages = [];
       this.currentChannel = '19865469';
   }
   
   getLobbyMessages(){
       return this.lobbyMessages;
   }
   
   getUsers(){
       return this.users;
   }
   
   print(){
       console.log(this.authorization)
       console.log(this.users);
   }
   
   async initialize(){
       await this.getToken('MatchMaking',true);              
       await this.requestUsers();
       await this.requestLobbyMessages();
       
       
//       this.addUser('tobi', 'tobias', 'kunz', 'bla@gmx,de', '666');
   }
   
   async loginAs(username='') {
       console.log(username)
       await this.getToken(username,false);
   }
      
   async getToken(userId, su = false){       
       var obj = new Object();
       obj.grant_type = this.secretKey;
       obj.user_id = userId;
       obj.su = su;
       
        
       var json;
       let response = await new Promise(resolve => {

           var xhr = new XMLHttpRequest();
           xhr.open("POST", this.tokenProvider, true);
           xhr.setRequestHeader("Content-Type", "application/json");
           xhr.onload = function(e) {
               resolve(xhr.response);
             };
           xhr.onreadystatechange = function persist() {
               if (xhr.readyState === 4 && xhr.status === 200) {
                   json = JSON.parse(xhr.responseText);
               }
           };
           var data = JSON.stringify(obj);
           xhr.send(data);  
       })
       this.authorization = json;
   }
   
   async addUser(username, firstName, lastName, email, userId) {
       await fetch(this.api + '/users' ,{
           method: 'post',
           headers: {
             "Content-type": "application/json; charset=UTF-8",
             "Authorization": "Bearer " + this.authorization.access_token
           },
           body: JSON.stringify({
               "name": firstName + ' ' + lastName,
               "id": username,
               "avatar_url":  '',
               "custom_data": {
                       "email": email,
                       "userId": userId
               }
           })
         })
         .then(response => response.json())
         .then(data => {
            console.log(data)
         })
         .catch(function (error) {
           console.log('Request failed', error);
         });
   }
   
   
   async requestUsers() {
       var json;
       await fetch(this.api + '/users' ,{
           method: 'get',
           headers: {
             "Content-type": "application/json; charset=UTF-8",
             "Authorization": "Bearer " + this.authorization.access_token
           }
         })
         .then(response => response.json())
         .then(data => {
            json = data;
         })
         .catch(function (error) {
           console.log('Request failed', error);
         });
         this.users = json;
   }
   
   async requestLobbyMessages() {
       await this.requestMessagesFromRoom('19865469');
   }
   
   
   async requestMessagesFromRoom(roomId=this.currentChannel) {
       var json;
       await fetch(this.api + '/rooms/' + roomId + '/messages' ,{
       method: 'get',
       headers: {
         "Content-type": "application/json; charset=UTF-8",
         "Authorization": "Bearer " + this.authorization.access_token
       }
     })
     .then(response => response.json())
     .then(data => {
        json = data;
     })
     .catch(function (error) {
       console.log('Request failed', error);
     });
     this.lobbyMessages = json;
   }
   
   async submitMessage(message='', roomId=this.currentChannel) {
       await fetch(this.api + '/rooms/' + roomId + '/messages' ,{
       method: 'post',
       headers: {
         "Content-type": "application/json; charset=UTF-8",
         "Authorization": "Bearer " + this.authorization.access_token
       },
       body: JSON.stringify({
           "parts": [{ "type": "text/plain",
                       "content": message
                     }]
       })
     })
     .then(response => response.json())
     .then(data => {
        console.log(data)
     })
     .catch(function (error) {
       console.log('Request failed', error);
     });
   }
}

export default APICallsToChatkit;