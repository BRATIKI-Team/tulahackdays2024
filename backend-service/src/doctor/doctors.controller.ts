import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorsService } from './doctors.service';
import { BaseController } from 'src/base/base.controller';
import { Doctor } from './entities/doctor.entity';

// BaseControoler пока не дружит с post запросами к свагерру из-за generics  
@Controller('doctors')
export class DoctorsController { // extends BaseController<Doctor, CreateDoctorDto> 
  constructor(private readonly doctorsService: DoctorsService) {
    // super(doctorsService);
  }

  @Post()
  @ApiBody({ type: CreateDoctorDto })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get('userId')
  @ApiQuery({name: 'id', type: Number})
  findByUserId(@Query('id') id: number) {
    return this.doctorsService.getByUserId(id);
  }

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }
}
