import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { SignsService } from './signs.service';

// BaseControoler пока не дружит с post запросами к свагерру из-за generics  
@Controller('signs')
export class SignsController { // extends BaseController<Doctor, CreateDoctorDto> 
  constructor(private readonly signsService: SignsService) {
    // super(doctorsService);
  }

  @Get('getAllByDoctorId')
  @ApiQuery({name: 'tg_doctor_id', type: Number})
  findAllByDoctorId(@Query('tg_doctor_id') id: number) {
    return this.signsService.getAllByDoctorId(id);
  }

  @Get('getAllByPatientId')
  @ApiQuery({name: 'tg_patient_id', type: Number})
  findAllByPatientId(@Query('tg_patient_id') id: number) {
    return this.signsService.getAllByPatientId(id);
  }
}
