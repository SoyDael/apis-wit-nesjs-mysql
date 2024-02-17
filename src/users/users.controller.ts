import { Body, Controller, Post, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateUserDTO } from './DTO/createUser.dto'
import { UsersService } from './users.service';
import { user } from './user.entity';
import { updateUserDTO } from './DTO/updateUserDTO';
import { CreateProfileDTO } from './DTO/createProfileDTO';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post('/createUser')
    createUser(@Body() newUser: CreateUserDTO) //promise indica el tipo de usuario que se espera 
    {
        return this.userService.createUser(newUser)
    }

    @Get('/getUsers')
    getUsers(): Promise<user[]> {
        return this.userService.getUsers()
    }

    @Get('/getUserById/:id') //parseIntPIPE convierte el string a un numero
    getUserById(@Param('id', ParseIntPipe) id: number) {
        console.log(id);
        console.log(typeof id);

        return this.userService.getUserById(id)
    }

    @Delete('/deleteUser/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id)
    }

    @Patch('/updateUser/:id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: updateUserDTO) {
        return this.userService.updateUser(id, user)
    }

    @Post('/createProfile/:id')
    createProfile(@Param('id', ParseIntPipe) id: number, @Body() profile: CreateProfileDTO) {
        return this.userService.createProfile(id, profile)
    }
}


