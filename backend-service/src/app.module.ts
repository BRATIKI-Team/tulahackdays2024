import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import { DoctorsModule } from './doctor/doctors.module';

@Module({
  imports: [
    UsersModule,
    DoctorsModule,
    TelegrafModule.forRoot({
      token: '7868217310:AAGi-c7r4SRkL20eh_m4cpNjHaJjQNED1Ws',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
