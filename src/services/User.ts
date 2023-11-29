import {Response } from "express";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/User";
import { EmailService } from "./Email";

type LoginRequestBody = {
    email: string;
    code: number;
}

export class UserService{
    private repository : UserRepository;
    private emailService: EmailService

    constructor(repository: UserRepository){
        this.repository = repository;
        this.emailService = new EmailService();
    }

    private getAccesssCode = (user: User) => {
        const currentTime = new Date();
        const accessCodeValidity = new Date(currentTime.getTime() + (1 * 60 * 60 * 1000));
        const accessCode = Math.floor(100000 + Math.random() * 900000);

        user.accessCode = accessCode;
        user.accessCodeValidity = accessCodeValidity;
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
            const savedUser = await this.repository.save(user);

            this.emailService.send({
                name: savedUser.firstName,
                email: savedUser.email
            },
            "http://localhost:3333",
            "Valide seu E-mail"
            );


            response.status(201);
            response.json(savedUser)

        }catch(error){
            response.status(500);
            response.json({
                message: error
            });
        }
    }

    public validateEmail = async (email: string, response: Response) =>{
        try{
            const foundUser = await this.repository.findUserByEmail(email);

            if(!foundUser){
                response.status(400);
                response.json({
                    message: "User not found"
                })

                return;
            }

            foundUser.validatedEmail = true;
            await this.repository.update(foundUser);
            
            response.status(200);
            response.json({
                message: "Email validated"
            })

        }catch(error){
            response.status(500);
            response.json({
                message: error
            });
        }
    }

    public generateAccessCode = async (email: string, response: Response) => {
        try{
            const foundUser = await this.repository.findUserByEmail(email);

            if(!foundUser || !foundUser.validatedEmail){
                response.status(400);
                response.json({
                    message: "User not found"
                });

                return;
            }

            this.getAccesssCode(foundUser);

            await this.repository.update(foundUser)

            this.emailService.send({
                name: foundUser.firstName,
                email: foundUser.email
            },
            "http://localhost:3333",
            `Seu código de acesso é: ${foundUser.accessCode}`
            );

            response.status(201);
            response.json({
                message: "Code generated"
            })

        }catch(error){
            response.status(500);
            response.json({
                message: error
            });
        }
    }

    public login = async (data: LoginRequestBody, response: Response) => {
        try{

            const foundUser = await this.repository.findUserByEmail(data.email);

            if(!foundUser || !foundUser.validatedEmail){
                response.status(400);
                response.json({
                    message: "User not found"
                });

                return;
            }

            const currentTime = new Date();

            if(!foundUser.accessCode || (foundUser.accessCodeValidity < currentTime) || (foundUser.accessCode !== data.code) ){
                response.status(400);
                response.json({
                    message: "Invalid access code"
                });

                return;
            }

            response.status(200);
            response.json({
                message: "Logged successfully"
            })

       } catch(error){
            response.status(500);
            response.json({
                message: error
            });
        }
    }
}