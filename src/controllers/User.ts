import { Request, Response } from "express";
import { User } from "../entities/User";
import {UserRepository } from "../repositories/User";
import { UserService } from "../services/User";

export class UserController {
    private repository : UserRepository;
    private service : UserService;

    constructor(){
        this.repository = new UserRepository();
        this.service = new UserService(this.repository);
    }

    public create = async (req: Request, res: Response) => {
        const user = new User(
            req.body.firstName, 
            req.body.secondName, 
            req.body.email, 
            req.body.cpf
        );
        
        await this.service.create(user, res);
    }

    public validateEmail = async (req: Request, res: Response) => {
       await this.service.validateEmail(req.body.email, res);
    }

    public generateAccessCode = async (req: Request, res: Response) => {
        await this.service.generateAccessCode(req.body.email, res);
    }

    public login = async (req: Request, res: Response) => {
        await this.service.login({
            code: req.body.code,
            email: req.body.email
        }, res);
    }
}