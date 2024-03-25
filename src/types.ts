export type User = {
    id:string;
    name:string;
    username:string;
    technologies:Technology[];
}

export type Technology = {
    id:string;
    title:string;
    studied:boolean;
    deadline:Date;
    created_at:Date;
}

export interface IUserRepository{
    addUser: (user:User) => void
    getUser: (username:string) => User | undefined
}