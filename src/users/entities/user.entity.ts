import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number

    @Column({ length: 50})
    nom : string

    @Column({ length: 50})
    prenom : string

    @Column()
    email : string

    @Column()
    username : string

    @Column()
    salt : string

    @Column()
    password : string

    @Column()
    age : number

}
