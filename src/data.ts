import { IUserRepository, User } from "./types";

class UserRepository implements IUserRepository{
    users: User[];
    constructor(){
        this.users = [];
    }

    addUser(user:User){
        this.users.push(user);
    }

    getUser(username:string){
        return this.users.find(u => u.username == username);
    }
}

export default new UserRepository();