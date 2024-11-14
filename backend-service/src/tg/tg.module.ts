import { Module } from '@nestjs/common';
import { GreeterController } from './controllers/greeter.controller';

@Module({
  providers: [GreeterController],
})
export class TgModule {}
