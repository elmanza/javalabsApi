import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/models/role.model';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
    imports: [SequelizeModule.forFeature([Role])], // Registramos el modelo Role
    controllers: [RoleController],
    providers: [RoleService], // Proveemos el servicio RoleService
    exports: [RoleService],
})
export class RoleModule {}
