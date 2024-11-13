import { DbModule } from '@db/db.module';
import { DbToken } from '@db/db.token';
import { Module, Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DoctorSchema } from './entities/doctor.schema';
import { DoctorsToken } from './doctors.token';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

const providers: Provider[] = [
  {
    provide: DoctorsToken.DOCTOR_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('doctors', DoctorSchema),
    inject: [DbToken.DATABASE_CONNECTION],
  },
];

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService, ...providers],
  imports: [DbModule],
})
export class DoctorsModule {}
