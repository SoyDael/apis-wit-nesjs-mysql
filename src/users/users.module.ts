import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm' 
import { user } from './user.entity';
import { profile } from './profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([user, profile])], //indica que entidades puede cargar
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
