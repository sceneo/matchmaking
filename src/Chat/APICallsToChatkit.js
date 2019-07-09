import CryptoJS from "crypto-js"; 

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
       this.roomMessages = [];
       this.userRooms = [];
       this.currentChannel = '19865469';
       this.currentUser = 'MatchMaking';
       this.newestRoomId = '';
       this.newestRoomName = '';
       this.chatManager = [];
       this.rootToken = '';
   }
// request current status and details 
   getRootToken(){
       return this.rootToken;
   }
   
   getNewestRoomName(){
       return this.newestRoomName;
   }
   
   getNewestRoomId(){
       return this.newestRoomId;
   }
   
   getCurrentChannel(){
       return this.currentChannel;
   }
   
   async setCurrentChannel(channel){
       this.currentChannel = channel;
       await this.requestMessagesFromRoom(this.currentChannel);
   }
   
   getRoomMessages(){
       return this.roomMessages;
   }
   
   getUsers(){
       return this.users;
   }
   
   getUserRooms(){
       return this.userRooms;
   }
   
   getCurrentUser(){
       return this.currrentUser;
   }
   
   print(){
       console.log(this.authorization)
       console.log(this.users);
       console.log(this.currentUser);
   }
   
   async initialize(){
       await this.getToken('MatchMaking',true);              
       await this.requestUsers();
       await this.requestMessagesFromRoom(this.currentRoom);
   }
   
   async loginAs(username='') {
       this.currentUser = username;
       await this.getToken(username,false);
   }

// receiving the token with the user ID and valid credentials
   
   async getToken(userId, su = true){       
       var obj = new Object();
       obj.grant_type = 'client_credentials';
       obj.user_id = userId;
       obj.su = su;

// handling JSON web token for authentication
       
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

// Adding new users
   
   async addUser(username, firstName, lastName, email) {
       await fetch(this.api + '/users' ,{
           method: 'post',
           headers: {
             "Content-type": "application/json; charset=UTF-8",
             "Authorization": "Bearer " + this.rootToken
           },
           body: JSON.stringify({
               "name": firstName + ' ' + lastName,
               "id": username,
               "custom_data": {
                       "email": email
               }
           })
         })
         .then(response => response.json())
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
   
   async requestUserRooms() {
       await fetch(this.api + '/users/' + this.currentUser + '/rooms' ,{
       method: 'get',
       headers: {
         "Content-type": "application/json; charset=UTF-8",
         "Authorization": "Bearer " + this.authorization.access_token
       }
     })
     .then(response => response.json())
     .then(data => {
        this.userRooms = data;
     })
     .catch(function (error) {
       console.log('Request failed', error);
     });
   }
   
// message is submitted into a room / channel - auth. via token in header
   
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
     .catch(function (error) {
       console.log('Request failed', error);
     });
   }
   
// message is requested from room -auth. via token in header
   
   async requestMessagesFromRoom(roomId=this.currentChannel) {
       this.messages = [];
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
     this.roomMessages = json;   
   }
   
// private room refers to 1:1 chat functionality
   
   async requestNewPrivateRoom(username) {
       await fetch(this.api + '/rooms' ,{
           method: 'post',
           headers: {
             "Content-type": "application/json; charset=UTF-8",
             "Authorization": "Bearer " + this.authorization.access_token
           },
           body: JSON.stringify({
               "name": "1-1_"+this.currentUser+"_"+username,
               "private": true,
               "user_ids": [this.currentUser,username]
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

   
// Initialization of cryptographic key / token for authentication
   async initializeRoot() {
      
      var header = {
              "alg": "HS256",
              "typ": "JWT"
            }
       
      var data = {
           "instance": "8a1e4d4b-5933-473f-bd5d-d4893859ffcd",
           "iss": "api_keys/6fbd13f5-4d17-4a14-b8bb-95d56416bfc2",
           "iat": Math.round((new Date()).getTime() / 1000),
           "exp": Math.round((new Date()).getTime() / 1000) + 8000,
           "sub": "MatchMaking",
           "su": true
         }
      
      var secret = "BehYgWeMTwQ3kzNUUwgfca3lVTfK9/uG4syEM62U3Jc=";
       
      var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
      var encodedHeader = this.encode(stringifiedHeader);

      var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
      var encodedData = this.encode(stringifiedData);

      var signature = encodedHeader + "." + encodedData;
      signature = CryptoJS.HmacSHA256(signature, secret);
      signature = this.encode(signature);
      
      
      this.rootToken = encodedHeader + '.' + encodedData + '.' + signature
   }
   
   encode(source) {
       var encodedSource = ''
       // Encode in classical base64
       encodedSource = CryptoJS.enc.Base64.stringify(source);
       
       // Remove padding equal characters
       encodedSource = encodedSource.replace(/=+$/, '');
       
       // Replace characters according to base64url specifications
       encodedSource = encodedSource.replace(/\+/g, '-');
       encodedSource = encodedSource.replace(/\//g, '_');
       
       return encodedSource;
     }
       
}
 
export default APICallsToChatkit;