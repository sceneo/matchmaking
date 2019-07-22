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
        await this.updateMessages();
        this.checkMessages();
    }
    
    async updateMessages() {
        // get a list of all seen messages for the user from lambda
        await this.lambda.requestMessageList();
        this.viewedMessages = this.lambda.getMessageList();
//        console.log(this.viewedMessages)
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
            if(latestMessage[0] === undefined) {
                continue
            }
            if(latestMessage[0].id !== undefined) {
                var message = {
                        roomId: this.userRooms[i].id,
                        participants: this.userRooms[i].member_user_ids,
                        messageId: latestMessage[0].id,
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
//        console.log('checking the message archive...')
        // check all rooms if there is a new message for the user       
        for(var i = 0 ; i < this.messageInventory.length; i++) {
//            console.log('inventory no: ' + i.toString())
//            console.log(this.messageInventory[i].roomId)
            var foundRoom = false;
            for(var j = 0; j < this.viewedMessages.length; j++) {
//                console.log('archive no: ' + j.toString())
                if( parseInt(this.messageInventory[i].roomId) === parseInt(this.viewedMessages[j].roomId)) {
//                    console.log('check for room ' +  this.viewedMessages[j].roomId)
                    foundRoom = true;
//                    console.log(this.messageInventory[i].messageId)
//                    console.log(this.viewedMessages[j].messageId)
                    if(parseInt(this.messageInventory[i].messageId) > parseInt(this.viewedMessages[j].messageId)) {
//                        console.log('found')
                        this.messageInventory[i].newMessage = true;
                    }
                    else {
//                        console.log('not equal')
                        this.messageInventory[i].newMessage = false;                
                    }
//                    console.log(this.messageInventory[i])
                }
            }
            if(!foundRoom) {
                this.messageInventory[i].newMessage = true;
            }
        }
    }
  
    hasUnreadMessages(username){
        
//        console.log('check for ' + username)
        if(this.verbose > 0) {
            console.log(username);
        }
        
        if(this.messageInventory.length === 0 || this.messageInventory === null) {
            return false;
        }
        
        for(var i = 0 ; i < this.messageInventory.length; i++) {
            if(this.messageInventory[i].roomId === '19865469') {
                continue;
            }   
//            console.log(this.messageInventory[i]);
            for(var j = 0; j < this.messageInventory[i].participants.length; j++) {
//                console.log('---> ' + this.messageInventory[i].participants[j])
                if(this.messageInventory[i].participants[j] === username) {
//                    console.log('----------------------- Identified!!!!')
//                    console.log(this.messageInventory[i].newMessage)
                    if(this.verbose > 0) {
                        console.log('found unread message from ' + username)
                    }
                    return this.messageInventory[i].newMessage;
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