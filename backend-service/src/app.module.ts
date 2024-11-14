import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '@users/users.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import config from './config';
import { DoctorsModule } from './doctor/doctors.module';

@Module({
  imports: [
    UsersModule,
    DoctorsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TG_BOT_TOKEN'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
