import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { post } from './post.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([post]), UsersModule,
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule { }
