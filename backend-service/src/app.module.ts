import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { AppController } from './app.controller';
import { DoctorsModule } from './doctor/doctors.module';

@Module({
  imports: [
    UsersModule,
    DoctorsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
