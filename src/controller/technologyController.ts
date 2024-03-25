import { NextFunction, Request, Response, Router } from "express";
import UserRepository from "../data";
import { Technology, User } from "../types";
import {v4 as uuid} from "uuid";

export const router = Router();

function checkExistsUserAccount(req:Request, res:Response, next:NextFunction){
    const {username} = req.headers;
    const userExist = UserRepository.getUser(username as string);
    if(userExist){
        res.locals.user = userExist;
        next();
    }        
    else
        res.status(403).json({error: "User not found."})
}

router.get('/', checkExistsUserAccount, (request, response) => {
    const user = response.locals.user as User;
    response.json(user.technologies);
})

router.post('/', checkExistsUserAccount, (request, response) => {
    const user = response.locals.user as User;
    const {title, deadline} = request.body;
    const technology:Technology = {
        id: uuid(),
        title,
        studied: false,
        deadline: new Date(deadline),
        created_at: new Date()
    }
    user.technologies.push(technology);
    response.status(201).json(technology);    
})

router.put('/:id', checkExistsUserAccount, (request, response) => {
    const user = response.locals.user as User;
    const {title, deadline} = request.body;
    const technology = user.technologies.find(t => t.id == request.params.id);
    if(technology){
        technology.title = title;
        technology.deadline = new Date(deadline);
        response.status(200).json(technology);
    } 
    else{
        response.status(404).json({error: "Technology not found."})
    }
})

router.delete('/:id', checkExistsUserAccount, (request, response) => {
    const user = response.locals.user as User;
    const index = user.technologies.findIndex(t => t.id === request.params.id);
    if(index == -1){
        response.status(404).json({error: "Technology not found."})
    }
    else{
        user.technologies.splice(index, 1);
        response.status(200).json({remaining_technologies: user.technologies});
    }
})

router.patch('/:id/studied', checkExistsUserAccount, (request, response) => {
    const user = response.locals.user as User;
    const technology = user.technologies.find(t => t.id === request.params.id);
    if(technology){
        technology.studied = true;
        response.status(200).json(technology);
    }
    else{
        response.status(404).json({error: "Technology not found"})
    }
})

