import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import config from './config';
import { DoctorsModule } from './doctor/doctors.module';
import { PatientsModule } from './patient/patients.module';
import { SignsModule } from './sign/signs.module';
import { TgModule } from './tg/tg.module';

@Module({
  imports: [
    DoctorsModule,
    PatientsModule,
    SignsModule,
    TgModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TG_BOT_TOKEN'),
        include: [TgModule],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
