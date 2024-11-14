import { IsDate, IsInt } from 'class-validator';

export class CreateSignDto {
  @IsInt()
  public readonly tg_doctor_id: number;
  
  @IsInt()
  public readonly tg_patient_id: number;

  @IsDate()
  public readonly date: Date;
}
