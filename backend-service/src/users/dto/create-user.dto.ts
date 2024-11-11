import { UserType } from '@users/enums/user-type.enum';
import { IsEnum, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  public readonly tg_user_id: number;

  @IsEnum(UserType)
  public readonly role: UserType;

  @IsString()
  public readonly firstname: string;

  @IsString()
  public readonly lastname: string;
}
