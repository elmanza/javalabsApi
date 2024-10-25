// // role.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { ModelCtor } from 'sequelize-typescript';
// import { Role } from 'src/models/role.model';

// @Injectable()
// export class RoleService {
//   constructor(@InjectModel(Role) private readonly roleModel: ModelCtor<Role>) {}

//   async find(id: number = null) {
//     return id ? await this.roleModel.findByPk(id) : await this.roleModel.findAll();
//   }

//   async create(body) {
//     return await this.roleModel.create(body);
//   }

//   async update(id: number, body) {
//     return await this.roleModel.update({ ...body }, { where: { id } });
//   }

//   async delete(id: number) {
//     return await this.roleModel.destroy({ where: { id } });
//   }
// }


// src/role/role.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/models/role.model';
import { ResourceModelsService } from 'src/utils/services/common/resource-models.service';
import { CreateRoleDto, UpdateRoleDto } from 'src/DTOs/role.dto';

@Injectable()
export class RoleService extends ResourceModelsService<Role> {
    constructor(@InjectModel(Role) roleModel: typeof Role) {
      super(roleModel);
    }
}
