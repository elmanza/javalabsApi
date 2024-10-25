import { Injectable } from '@nestjs/common';
import { FindOptions, UpdateOptions } from 'sequelize';
import { Model, ModelCtor } from 'sequelize-typescript';

@Injectable()
export class ResourceModelsService<T extends Model> {
  constructor(private readonly model: ModelCtor<T>) {}

  async find(id?: number): Promise<T | T[]> {
    return id
      ? await this.model.findByPk(id)
      : await this.model.findAll();
  }

  async findOne(where: Partial<T>): Promise<T | null> {
    const options: FindOptions = {
      where,
    };
    return await this.model.findOne(options);
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data as any);
  }

  async update(id: number, data: Partial<T>): Promise<[number]> {
    const options: UpdateOptions = {
      where: { id },
      returning: true,
    };
    return await this.model.update(data as any, options);
  }

  async delete(id: number): Promise<number> {
    const options: UpdateOptions = {
      where: { id }
    };
    return await this.model.destroy(options);
  }
}
