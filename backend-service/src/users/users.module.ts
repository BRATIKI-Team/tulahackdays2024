import { DbModule } from '@db/db.module';
import { DbToken } from '@db/db.token';
import { Module, Provider } from '@nestjs/common';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/users.service';
import { Connection } from 'mongoose';
import { UserSchema } from './entities/user.schema';
import { UsersToken } from './users.token';

const providers: Provider[] = [
  {
    provide: UsersToken.USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('users', UserSchema),
    inject: [DbToken.DATABASE_CONNECTION],
  },
];

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...providers],
  imports: [DbModule],
})
export class UsersModule {}
