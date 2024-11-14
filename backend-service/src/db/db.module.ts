import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { DbToken } from './db.token';

const providers: Provider[] = [
  {
    provide: DbToken.DATABASE_CONNECTION,
    useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(configService.get<string>('DB_CONNECTION_STRING')),
    inject: [ConfigService],
  },
];

@Module({
  providers: providers,
  exports: providers,
})
export class DbModule {}
