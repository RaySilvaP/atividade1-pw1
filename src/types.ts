export type User = {
    id: string;
    name: string;
    username: string;
    technologies: Technology[];
}

export type Technology = {
    id: string;
    title: string;
    studied: boolean;
    deadline: Date;
    created_at: Date;
}

export interface IUserRepository{
    addUser: (user: User) => void
    getUser: (username: string) => Promise<User | null>
}

export interface ITechnologyRepository{
    getUserTechnologies: (userId: string) => Promise<Technology[]>
    addUserTechnology: (userId: string, technology: Technology) => void
    getTechnology: (technologyId: string) => Promise<Technology | null>
    updateTechnology: (technology: Technology) => void
    deleteTechnology: (technologyId: string) => void
}