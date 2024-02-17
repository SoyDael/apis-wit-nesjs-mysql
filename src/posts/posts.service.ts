import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { post } from './post.entity';
import { Repository } from 'typeorm';
import { createPostDto } from './DTO/create.post.dto';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(post) private postRepository: Repository<post>,
        private userService: UsersService
    ) { }

    async createPost(post: createPostDto) {
        const userFound = await this.userService.getUserById(post.authorId);

        if(!userFound) return new HttpException('User not found', HttpStatus.NOT_FOUND);

        const newPost = this.postRepository.create(post);
        return await this.postRepository.save(newPost);
    }

    getPosts() {
        return this.postRepository.find({
            relations: ['author']
        });
    }

}
