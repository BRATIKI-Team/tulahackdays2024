import { IsInt, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsInt()
  public readonly tg_user_id: number;

  @IsString()
  public readonly firstname: string;

  @IsString()
  public readonly lastname: string;
}
