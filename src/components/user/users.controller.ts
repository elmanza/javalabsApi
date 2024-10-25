import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Get()
    findAll(){
        return this.userService.find();
    }

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.userService.find(id);
    }

    @Post()
    create(@Body() body){
        return this.userService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body){
        return this.userService.update(id, body);
    }


    @Delete(':id')
    delete(@Param('id') id: number){
        return this.userService.delete(id);
    }

}