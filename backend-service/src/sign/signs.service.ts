import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { SignsToken } from './signs.token';
import { Sign } from './entities/sign.entity';
import { CreateSignDto } from './dto/create-sign.dto';

@Injectable()
export class SignsService extends BaseService<Sign, CreateSignDto> {
  public constructor(
    @Inject(SignsToken.SIGN_MODEL) private readonly signModel: Model<Sign>,
  ) {
    super(signModel);
  }

  // Получать записи юзера и доктора в SingsService или же просто доставать 
  // из модели доктора или пациента, и, следовательно, прописать в 
  // DoctorsService & PatientsService
  public async getAllByPatientId(id: number): Promise<Sign[]> {
    const entity = await this.signModel.find({tg_patient_id: id}).exec();
    if (!entity) {
      return [];
    }
    return entity;
  }

  public async getAllByDoctorId(id: number): Promise<Sign[]> {
    const entity = await this.signModel.find({tg_doctor_id: id}).exec();
    if (!entity) {
      return [];
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
