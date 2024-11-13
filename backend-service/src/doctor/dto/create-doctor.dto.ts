import { IsEnum, IsInt, IsString } from 'class-validator';
import { DoctorSpecializationType } from '../enums/doctor-type.enum';

export class CreateDoctorDto {
  @IsInt()
  public readonly tg_user_id: number;

  @IsString()
  public readonly firstname: string;

  @IsString()
  public readonly lastname: string;

  @IsEnum(DoctorSpecializationType)
  public readonly specialization: DoctorSpecializationType;
}
