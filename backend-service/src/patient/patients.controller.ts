import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientsService } from './patients.service';

// BaseControoler пока не дружит с post запросами к свагерру из-за generics  
@Controller('patients')
export class PatientsController { // extends BaseController<Doctor, CreateDoctorDto> 
  constructor(private readonly patientsService: PatientsService) {
    // super(doctorsService);
  }

  @Post()
  @ApiBody({ type: CreatePatientDto })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get('userId')
  @ApiQuery({name: 'id', type: Number})
  findByUserId(@Query('id') id: number) {
    return this.patientsService.getByUserId(id);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }
}
