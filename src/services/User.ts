import {Response } from "express";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/User";

export class UserService{
    private repository : UserRepository;

    constructor(repository: UserRepository){
        this.repository = repository;
    }

    public create = async (user: User, response: Response) => {
        try{
            const foundUser = await this.repository.findUserByEmail(user.email)
            if(foundUser){
                response.status(400);
                response.json({
                    message: "User already exists"
                });

                return;
            }

            user.validatedEmail = false;
            const savedUser = await this.repository.create(user);

            response.status(201);
            response.json(savedUser)

        }catch(error){
            response.status(500);
            response.json({
                message: "There was an internal server error"
            })
        }
    }
}