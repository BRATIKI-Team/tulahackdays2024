import { DbModule } from '@db/db.module';
import { DbToken } from '@db/db.token';
import { Module, Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { SignsToken } from './signs.token';
import { SignsService } from './signs.service';
import { SignSchema } from './entities/sign.schema';
import { SignsController } from './signs.controller';

const providers: Provider[] = [
  {
    provide: SignsToken.SIGN_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('signs', SignSchema),
    inject: [DbToken.DATABASE_CONNECTION],
  },
];

@Module({
  controllers: [SignsController],
  providers: [SignsService, ...providers],
  imports: [DbModule],
})
export class SignsModule {}
