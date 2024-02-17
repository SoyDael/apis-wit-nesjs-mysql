import { Body, Controller, Get, Post } from '@nestjs/common';
import { createPostDto } from './DTO/create.post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(
        private postService: PostsService
    ) { }

    @Post("createPost")
    createpost(@Body() post: createPostDto) {
        return this.postService.createPost(post);
    }

    @Get("getPosts")
    getPosts() { 
        return this.postService.getPosts();
    }
}
