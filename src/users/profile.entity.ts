import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_profile')
export class profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({nullable: true})
    age: number;

}