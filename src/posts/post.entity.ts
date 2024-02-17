import { user } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('post')
export class post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    authorId: number;

    @ManyToOne(() => user, user => user.posts) //funcion que accede a la entidad user y a la propiedad posts
    author: user;
    
}