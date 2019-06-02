class ChatkitAuthentification  {

    
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
  }
  
  getAuthorization(){
      return this.authorization;
  }

  async getToken(){
      var obj = new Object();
      obj.grant_type = this.secretKey;
      obj.user_id = 'MatchMaking';
       
      let response = await new Promise(resolve => {
          var json;
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
      var obj = JSON.parse(response)
      this.authorization = obj;
  }      
} 
  
export default ChatkitAuthentification;
