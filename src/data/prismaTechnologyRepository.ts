import { PrismaClient } from "@prisma/client";
import { ITechnologyRepository, Technology } from "../types";

class PrismaTechnologyRepository implements ITechnologyRepository{
    private client : PrismaClient

    constructor(){
        this.client = new PrismaClient();
    }

    async getUserTechnologies(userId: string){
        const user = await this.client.user.findUnique({
            where: {id: userId},
            include: {technologies: true}
        })
        
        if(user == null)
            return [] as Technology[];
        else{
            return user.technologies.map(t => ({
                id: t.id.toString(),
                title: t.title,
                studied: t.studied,
                deadline: t.deadline,
                created_at: t.created_at
            })) as Technology[]
        }
    };

    async addUserTechnology(userId: string, technology : Technology){
        await this.client.technology.create({
            data: {
                id: technology.id,
                title: technology.title,
                studied: technology.studied,
                deadline: technology.deadline,
                created_at: technology.created_at,
                userId
            }
        })
    }

    async getTechnology(technologyId: string){
        const technology = await this.client.technology.findUnique({
            where: {
                id: technologyId
            }
        });
        if(technology != null){
            return {
                id: technology.id,
                title: technology.title,
                studied: technology.studied,
                deadline: technology.deadline,
                created_at: technology.created_at
            } as Technology;
        }
        else
            return null;
    }

    async updateTechnology(technology: Technology){
        await this.client.technology.update({
            where: {
                id: technology.id
            },
            data: {
                title: technology.title,
                deadline: technology.deadline,
                studied: technology.studied
            }
        })
    }

    async deleteTechnology(technologyId: string){
        await this.client.technology.delete({
            where: {
                id: technologyId
            }
        })
    }

    async patchTechnology(technologyId: string, studied: boolean){
        await this.client.technology.update({
            where: {
                id: technologyId
            },
            data: {
                studied: studied
            }
        })
    }
}

export default PrismaTechnologyRepository;