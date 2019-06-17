class RoomHandler {
    constructor(chatkitApi) {
        this.rooms = [];
        this.chatkitApi = chatkitApi;
        this.currentRoom = 'MatchMaking';
    }   
    
    getCurrentRoom(){
        
    }
    
    getRooms(){
        // get all the rooms from Chatkit
    }
    
    isExistingRoom(user = ''){
        user1 = user:
        user2 = this.chatkitApi.getCurrentUser();
        
        // loop over rooms
        // check if contains user1 / user2
    }
    
    createNewRoom(){
        
    }
    
}
export default RoomHandler;