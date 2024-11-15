import { Module } from '@nestjs/common';
import { UserController } from './input/controllers/UserController';
import { AuthController } from './input/controllers/AuthController';
import { CustomerController } from './input/controllers/CustomerController';
import { ReceivableController } from './input/controllers/ReceivableController';

@Module({
  controllers: [
    UserController,
    AuthController,
    CustomerController,
    ReceivableController,
  ],
})
export class AdapterModule {}
