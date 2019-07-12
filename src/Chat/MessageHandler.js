class MessageHandler {
    constructor(chatkitApi, lambdaApi) {
        this.verbose = 0;
        this.chatkit = chatkitApi;
        this.lambda = lambdaApi;
        
        this.userRooms = [];
        this.messageInventory = [];
        this.viewedMessages = [];
        
    }
    
    async init(){
        await this.updateRooms();
        
        
    }
    
    async updateMessages() {
        // get a list of all seen messages for the user from lambda
    }
    
    async seenMessageByRoomId(roomId) {
        // submit to lambda: roomId has been seen
    }
    
    async updateRooms(){
        await this.chatkit.requestUserRooms();
        this.userRooms = this.chatkit.getUserRooms();
        if(this.verbose > 0) {
            console.log(this.userRooms);
        }
        for(var i = 0; i < this.userRooms.length; i++) {
            await this.chatkit.requestLatestMessagesFromRoom(this.userRooms[i].id);
            var latestMessage = this.chatkit.getLatestMessage();
            var message = {
                    room: this.userRooms[i].id,
                    participants: this.userRooms[i].member_user_ids,
                    latestMessage: latestMessage[0].id,
                    newMessage: false
            }
            this.messageInventory.push(message);
            if(this.verbose > 0) {
                console.log(message);               
            }
        }
    }
    
    checkMessages(){
        // check all rooms if there is a new message for the user
        for(var i = 0 ; i < this.messageInventory.length; i++) {
            
            if(this.messageInventory[i].latestMessage in this.viewedMessages) {
                this.messageInventory[i].newMessage = true;
            }
            else {
                this.messageInventory[i].newMessage = false;                
            }
        }
    }
  
    hasUnreadMessages(username){
        if(this.verbose > 0) {
            console.log(username);
        }
        for(var i = 0 ; i < this.messageInventory.length; i++) {
            if(this.messageInventory[i].id === '19865469') {
                continue;
            }
            
            for(var j = 0; j < this.messageInventory[i].participants.length; j++) {
                if(this.messageInventory[i].participants[j] === username) {
                    return true;
                }
            }
        }
        return true;
    }
}
export default MessageHandler;