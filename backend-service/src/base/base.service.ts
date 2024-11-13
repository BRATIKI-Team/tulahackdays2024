import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Document } from 'mongoose';


@Injectable()
export class BaseService<Entity extends Document, EntityDto> {
  public constructor(
    protected readonly entityModel: Model<Entity>,
  ) {}

  public create(entityDto: EntityDto): Promise<Entity> {
    const createdEntity = new this.entityModel(entityDto);
    return createdEntity.save();
  }

  public findAll(): Promise<readonly Entity[]> {
    return this.entityModel.find().exec();
  }

  // automatic id from mongoDb
  public async getById(id: string): Promise<Entity> {
    const entity = await this.entityModel.findById(id).exec();
    if (!entity) {
      throw new NotFoundException(`Entity from ${this.constructor.name} with id ${id} not found`);
    }
    return entity;
  }

  public async update(id: string, entityDto: EntityDto): Promise<Entity> {
    const updatedEntity = await this.entityModel.findByIdAndUpdate(
      id,
      entityDto,
      { new: true, useFindAndModify: false } // new: true возвращает обновлённую сущность
    );
    if (!updatedEntity) {
      throw new NotFoundException(`Entity from ${this.constructor.name} with id ${id} not found`);
    }
    return updatedEntity;
  }

  public async delete(id: string): Promise<void> {
    const result = await this.entityModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Entity from ${this.constructor.name} with id ${id} not found`);
    }
  }
}
