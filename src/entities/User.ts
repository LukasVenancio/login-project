import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', nullable: false})
    firstName: string;

    @Column({type: 'varchar', nullable: false})
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


    
    @Column({type: 'datetime'})
    createdAt: Date;

    @Column({type: 'datetime'})
    modifieldDate: Date;

    @Column({type: 'boolean', nullable: false})
    isActive: boolean;

    @Column({type: 'int'})
    passport: number;

    @Column({type: 'int'})
    telephone: number;

    @Column({type: 'varchar'})
    state: string

    @Column({type: 'varchar'})
    city: string

    @Column({type: 'varchar'})
    address: string

    @Column({type: 'int'})
    addressNumber: number;

    @Column({type: 'varchar'})
    postalCode: string

    @Column({type: 'varchar'})
    profilePhoto: string

    @Column({type: 'datetime'})
    purchaseDate: Date;

    @Column({type: 'datetime'})
    lastAccess: Date;

    @Column({type: 'varchar'})
    password: string

    @Column({type: 'int'})
    accessLevel: number;

    @Column({type: 'int'})
    userPlan: number;

    @Column({type: 'boolean'})
    acceptedPrivacyPolicy: boolean;

    @Column({type: 'boolean'})
    acceptedTermsUse: boolean;


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

        this.createdAt = new Date();
        this.modifieldDate = new Date();
        this.isActive = false;
        this.passport = 1111;
        this.telephone = 1111;
        this.state = "São Paulo";
        this.city = "São Paulo";
        this.address = "Algum endereco, Jardim Algum Jardim";
        this.addressNumber = 11;
        this.postalCode = "11111-111"
        this.profilePhoto = "https://someurl.png"
        this.purchaseDate = new Date();
        this.lastAccess = new Date();
        this.password = "111111";
        this.accessLevel = 1;
        this.userPlan = 1;
        this.acceptedPrivacyPolicy = false;
        this.acceptedTermsUse = false;
    }
}