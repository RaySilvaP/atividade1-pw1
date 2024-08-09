import { PrismaClient } from "@prisma/client";
import { IUserRepository, User } from "../types";

class PrismaUserRepository implements IUserRepository{
    private client: PrismaClient

    constructor(){
        this.client = new PrismaClient();
    }

    async addUser(user: User){
        await this.client.user.create({
            data: {
                id: user.id,
                name : user.name,
                username : user.username,
                technologies: {
                    create: user.technologies
                }
            }
        })
    };

    async getUser(username: string){
        const user = await this.client.user.findUnique({
            where: {
                username
            }
        })
        if(user != null){
            return {
                id: user.id,
                username: user.username, 
                name: user.name
            } as User
        }
        else
            return null
    };
}

export default PrismaUserRepository;