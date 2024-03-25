import { Router } from "express";
import { User } from "./types";
import UserRepository from "./data";
import {v4 as uuid} from "uuid";
export const router = Router();

router.post('/', (request, response) => {
    const user = request.body as User;
    const userExist = UserRepository.getUser(user.username);
    if(userExist)
        response.status(400).json({error: "Username already exists."});
    user.id = uuid();
    user.technologies= [];
    UserRepository.addUser(user);
    response.status(201).json(user);
})

