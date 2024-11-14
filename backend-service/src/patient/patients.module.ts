import { DbModule } from '@db/db.module';
import { DbToken } from '@db/db.token';
import { Module, Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { PatientSchema } from './entities/patient.schema';
import { PatientsToken } from './patients.token';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

const providers: Provider[] = [
  {
    provide: PatientsToken.PATIENT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('patients', PatientSchema),
    inject: [DbToken.DATABASE_CONNECTION],
  },
];

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, ...providers],
  imports: [DbModule],
})
export class PatientsModule {}
