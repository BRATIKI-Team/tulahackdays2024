import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { DoctorsToken } from './doctors.token';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorsService extends BaseService<Doctor, CreateDoctorDto> {
  public constructor(
    @Inject(DoctorsToken.DOCTOR_MODEL) private readonly doctorModel: Model<Doctor>,
  ) {
    super(doctorModel);
  }

  public async getByUserId(id: number): Promise<Doctor> {
    const entity = await this.entityModel.findOne({tg_user_id: id}).exec();
    if (!entity) {
      throw new NotFoundException(`Doctor with user_id ${id} not found`);
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
