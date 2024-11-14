import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { PatientsToken } from './patients.token';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientsService extends BaseService<Patient, CreatePatientDto> {
  public constructor(
    @Inject(PatientsToken.PATIENT_MODEL) private readonly patientModel: Model<Patient>,
  ) {
    super(patientModel);
  }

  public async getByUserId(id: number): Promise<Patient> {
    const entity = await this.entityModel.findOne({tg_user_id: id}).exec();
    if (!entity) {
      throw new NotFoundException(`Patient with user_id ${id} not found`);
    }
    return entity;
  }
  // public create(createUserDto: CreateUserDto): Promise<User> {
  //   const createdUser = new this.userModel(createUserDto);
  //   return createdUser.save();
  // }

  // public findAll(): Promise<readonly User[]> {
  //   return this.userModel.find().exec();
  // }
}
