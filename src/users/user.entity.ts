import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { profile } from './profile.entity';
import { post } from 'src/posts/post.entity';

@Entity('users')
export class user {
    @PrimaryGeneratedColumn() //decorador que indica a la db que es una columna
    id: number   //Sintaxis de TypeScript, de esta forma le decimos a nuestra db los tipos de datos que vamos a utilizar
   
    @Column({ unique: true})
    username: string
   
    @Column()
    password: string
   
    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date
   
    @Column ({nullable: true})
    authStrategy: string

    @OneToOne(() => profile)
    @JoinColumn()
    profile: profile

    @OneToMany(() => post, post => post.author)//funcion que accede a la entidad post y a la propiedad author
    posts: post[]
}