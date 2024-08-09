import { NextFunction, Request, Response } from "express";
import PrismaUserRepository from "./data/prismaUserRepository";

const repository = new PrismaUserRepository();

export async function checkExistsUserAccount(req:Request, res:Response, next:NextFunction){
    const username = req.headers.username as string;
    const user = await repository.getUser(username);
    if(user){
        res.locals.user = user;
        next();
    }        
    else
        res.status(404).json({error: "User not found."})
}