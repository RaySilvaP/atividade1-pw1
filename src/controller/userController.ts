import { Router } from "express";
import { User } from "../types";
import PrismaUserRepository from "../data/prismaUserRepository";
import {v4 as uuid} from "uuid";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const router = Router();
const repository = new PrismaUserRepository();

router.post('/', (request, response) => {
    const user = request.body as User;
    user.id = uuid();
    user.technologies= [];
    try{
        repository.addUser(user);
        response.status(201).json(user);
    }catch(e){
        if(e instanceof PrismaClientKnownRequestError){
            return response.status(400).send("Username already exists.");
        }
        else{
            console.log(e);
            return response.status(500).send();
        }
    }
})

