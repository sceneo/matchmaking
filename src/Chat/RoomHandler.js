class RoomHandler {
    constructor(chatkitApi) {
        this.rooms = [];
        this.chatkitApi = chatkitApi;
        this.currentRoom = 'Lobby';
        this.currentRoomId = '19865469';
    }   
    // creaating the virtual 'room'/lobby for the chat for the two users 
    getCurrentRoom(){
        return this.currentRoom;
    }   
    
    getCurrentRoomId(){
        return this.currentRoomId;
    }
    
    print(){
        console.log(this.currentRoom);
        console.log(this.currentRoomId);
    }
    
    async getRoomsForUser(){
        await this.chatkitApi.requestUserRooms();
        this.rooms = this.chatkitApi.getUserRooms();
    }
    
    async switchRoom(username) {
        await this.getRoomsForUser();
        var foundUser = false;
        for(var i = 0; i < this.rooms.length; i++) {
            if(this.rooms[i].name === 'Lobby') {
                continue;
            }
            for(var name in this.rooms[i].member_user_ids ) {
                if(this.rooms[i].member_user_ids[name] === username) {
                    this.currentRoom = this.rooms[i].name;
                    this.currentRoomId = this.rooms[i].id;
                    foundUser = true;
                    break;
                }
            }
            if(foundUser) {
                break;
            }
        }
        
        if(username === 'Lobby') {
            this.currentRoom = 'Lobby';
            this.currentRoomId = '19865469';
        }
        
        if(!foundUser) {
            await this.chatkitApi.requestNewPrivateRoom(username);
            this.currentRoom = this.chatkitApi.getNewestRoomName();
            this.currentRoomId = this.chatkitApi.getNewestRoomId();
        }
        
    }
}
export default RoomHandler;