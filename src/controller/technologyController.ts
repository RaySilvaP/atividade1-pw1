import { Router } from "express";
import { checkExistsUserAccount } from "../middlewares";
import { Technology, User } from "../types";
import {v4 as uuid} from "uuid";
import PrismaTechnologyRepository from "../data/prismaTechnologyRepository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const router = Router();
const repository = new PrismaTechnologyRepository();

router.get('/', checkExistsUserAccount, async (request, response) => {
    const user = response.locals.user as User;
    try{
        const technologies = await repository.getUserTechnologies(user.id);
        response.status(200).json(technologies);    
    }catch(e){
        if(e instanceof PrismaClientKnownRequestError)
            return response.status(404).send("User not found");
        else{
            console.log(e);
            response.status(500).send();
        }
    }
})

router.post('/', checkExistsUserAccount, async (request, response) => {
    const user = response.locals.user as User;
    const {title, deadline} = request.body;
    const technology:Technology = {
        id: uuid(),
        title,
        studied: false,
        deadline: new Date(deadline),
        created_at: new Date()
    }
    try{
        await repository.addUserTechnology(user.id, technology);
        return response.status(201).json(technology);    
    }catch(e){
        if(e instanceof PrismaClientKnownRequestError){
            console.log(e);
            return response.status(400).send();
        }
        else{
            console.log(e);
            return response.status(500).send();
        }
    }
})

router.put('/:id', async (request, response) => {
    const {title, deadline} = request.body;
    const technology = await repository.getTechnology(request.params.id);
    if(technology){
        technology.title = title;
        technology.deadline = new Date(deadline);
        await repository.updateTechnology(technology);
        response.status(200).send();
    } 
    else{
        response.status(404).json({error: "Technology not found."});
    }
})

router.delete('/:id', checkExistsUserAccount, async (request, response) => {
    const user = response.locals.user as User;
    await repository.deleteTechnology(request.params.id);
    try{
        const technologies = await repository.getUserTechnologies(user.id);
        return response.status(200).json({remaining_technologies: technologies});
    }catch(e){
        if(e instanceof PrismaClientKnownRequestError)
            return response.status(404).send("Not found.");
        else{
            console.log(e);
            return response.status(500).send(); 
        }
    }
})

router.patch('/:id/studied', async (request, response) => {
    const technology = await repository.getTechnology(request.params.id);
    if(technology){
        technology.studied = true;
        await repository.updateTechnology(technology);
        response.status(200).send();
    }
    else{
        response.status(404).json({error: "Technology not found"})
    }
})