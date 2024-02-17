import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './DTO/createUser.dto'
import { updateUserDTO } from './DTO/updateUserDTO';
import { CreateProfileDTO } from './DTO/createProfileDTO';
import { profile } from './profile.entity';

@Injectable()
export class UsersService { //biblioteca que se comunica con la base de datos

    constructor(
        @InjectRepository(user) private UserRepository: Repository<user>,
        @InjectRepository(profile) private profileRepository: Repository<profile>,
    ) { }

    async createUser(user: CreateUserDTO) {

        const userFound = await this.UserRepository.findOne({
            where: {
                username: user.username
            }
        })

        if (userFound) {
            return new HttpException('Username already exists', HttpStatus.CONFLICT)
        }

        const newUser = this.UserRepository.create(user)
        return this.UserRepository.save(newUser)
    }

    getUsers() {
        return this.UserRepository.find({
            relations: ['posts', 'profile']
        })
    }

    async getUserById(id: number) {
        const userFound = await this.UserRepository.findOne({
            where: {
                id
            },
            relations: ['posts']
        })

        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return userFound
    }

    async deleteUser(id: number) {

        const result = await this.UserRepository.delete({ id });

        if (result.affected === 0) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return result;

        //lo mimso pero mas complejo ---explicalo  
        /*  const userFound = await this.UserRepository.findOne({ 
              where: {
                  id
              }
              });
          if (userFound) {
              return new HttpException('User not found', HttpStatus.NOT_FOUND)
          }
          return this.UserRepository.delete({ id });*/
    }

    async updateUser(id: number, user: updateUserDTO) {
        const userFound = await this.UserRepository.findOne({
            where: {
                id
            }
        })

        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const updateUSer = Object.assign(userFound, user)

        return this.UserRepository.save(updateUSer);
    }

    async createProfile(id: number, profile: CreateProfileDTO) {
        const userFound = await this.UserRepository.findOne({
            where: {
                id,
            },
        });

        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const newProfile = this.profileRepository.create(profile);

        const savedProfile = await this.profileRepository.save(newProfile);

        userFound.profile = savedProfile;

        return this.UserRepository.save(userFound);
    }
}
