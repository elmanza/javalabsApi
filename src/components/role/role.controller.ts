import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {

    constructor(private readonly roleService: RoleService){}

    @Get(':id?')
    find(@Param('id') id?: number) {
        return this.roleService.find(id);
    }

    @Post()
    create(@Body() body){
        return this.roleService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body){
        return this.roleService.update(id, body);
    }


    @Delete(':id')
    delete(@Param('id') id: number){
        return this.roleService.delete(id);
    }
}
