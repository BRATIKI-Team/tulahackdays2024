import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { User } from '@users/entities/user.entity';
import { Model } from 'mongoose';
import { UsersToken } from './users.token';

@Injectable()
export class UsersService {
  public constructor(
    @Inject(UsersToken.USER_MODEL) private readonly userModel: Model<User>,
  ) {}

  public create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  public findAll(): Promise<readonly User[]> {
    return this.userModel.find().exec();
  }
}
