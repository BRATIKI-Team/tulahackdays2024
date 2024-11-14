import { Body, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { BaseService } from './base.service';

export class BaseController<Entity extends Document, EntityDto> {
  constructor(protected readonly service: BaseService<Entity, EntityDto>) {}

  @Post()
  @ApiBody({ type: Object }) // Обернуть EntityDto в mixin что бы swagger видел generic class
  create(@Body() entityDto: EntityDto) {
    return this.service.create(entityDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}

