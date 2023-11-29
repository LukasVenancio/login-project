import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 20, nullable: false})
    firstName: string;

    @Column({type: 'varchar', length: 20, nullable: false})
    secondName: string;

    @Column({type: 'varchar', nullable: false})
    email: string;

    @Column({type: 'boolean', nullable: false})
    validatedEmail: boolean;

    @Column({type: 'int', nullable: false})
    cpf: number;

    @Column({type: 'int', nullable: true})
    accessCode: number;

    @Column({type: 'datetime', nullable: true})
    accessCodeValidity: Date;

    constructor(
        firstName: string,
        secondName: string,
        email: string,
        cpf: number
    ){
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
        this.cpf = cpf;
    }
}