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
        await this.lambda.requestMessageList();
        this.viewedMessages = this.lambda.getMessageList();
        console.log(this.viewedMessages)
    }
    
    seenMessageByRoomId(roomId, messageId) {
        this.lambda.updateMessageList(roomId,messageId);
    }
    
    async updateRooms(){
        await this.chatkit.requestUserRooms();
        this.userRooms = this.chatkit.getUserRooms();
        if(this.verbose > 0) {
            console.log(this.userRooms);
        }
        var messageInventoryNew = [];
        for(var i = 0; i < this.userRooms.length; i++) {
            await this.chatkit.requestLatestMessagesFromRoom(this.userRooms[i].id);
            var latestMessage = this.chatkit.getLatestMessage();
            if(latestMessage[0].id != undefined) {
                var message = {
                        room: this.userRooms[i].id,
                        participants: this.userRooms[i].member_user_ids,
                        latestMessage: latestMessage[0].id,
                        newMessage: false
                }
                messageInventoryNew.push(message);
                if(this.verbose > 0) {
                    console.log(message);               
                }
            }
        }
        this.messageInventory = messageInventoryNew;
    }
    
    checkMessages(){
        // check all rooms if there is a new message for the user
        
        console.log('Inventory: ')
        console.log(this.messageInventory)
        console.log('Viewed Messages:')
        console.log(this.viewedMessages) // warum ist das leer???
        
        
        for(var i = 0 ; i < this.messageInventory.length; i++) {
            var foundRoom = false;
            for(var j = 0; j < this.viewedMessages.length; j++) {
                if( this.messageInventory[i].roomId === this.viewedMessages[j].roomId) {
                    foundRoom = true;
                    if(parseInt(this.messageInventory[i].messageId) > parseInt(this.viewedMessages[j].messageId)) {
                        this.messageInventory[i].newMessage = true;
                    }
                    else {
                        this.messageInventory[i].newMessage = false;                
                    }
                }
            }
            if(!foundRoom) {
                this.messageInventory[i].newMessage = true;
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
                    if(this.verbose > 0) {
                        console.log('found unread message from ' + username)
                    }
                    return true;
                }
            }
        }
        if(this.verbose > 0) {
            console.log('no new message with ' + username)
        }        
        return false; 
    }
}
export default MessageHandler;