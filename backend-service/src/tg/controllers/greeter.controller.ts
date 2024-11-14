import { Start, Update } from 'nestjs-telegraf';

@Update()
export class GreeterController {
  @Start()
  onStart(): string {
    return 'Say hello to me';
  }
}
