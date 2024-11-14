import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DoctorsModule } from './doctor/doctors.module';
import { PatientsModule } from './patient/patients.module';
import { SignsModule } from './sign/signs.module';

@Module({
  imports: [
    DoctorsModule,
    PatientsModule,
    SignsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
