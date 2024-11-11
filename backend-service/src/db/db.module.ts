import { Module, Provider } from '@nestjs/common';
import mongoose from 'mongoose';
import { DbToken } from './db.token';

const providers: Provider[] = [
  {
    provide: DbToken.DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://root:example@localhost:27017'),
  },
];

@Module({
  providers: providers,
  exports: providers,
})
export class DbModule {}
