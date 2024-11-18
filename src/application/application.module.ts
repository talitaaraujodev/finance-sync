import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserEntity,
  UserSchema,
} from 'src/adapter/output/persistence/entities/UserEntity';
import {
  CustomerEntity,
  CustomerSchema,
} from 'src/adapter/output/persistence/entities/CustomerEntity';
import {
  ReceivableEntity,
  ReceivableSchema,
} from 'src/adapter/output/persistence/entities/ReceivableEntity';
import { UserPersistenceAdapter } from 'src/adapter/output/persistence/output/UserPersistenceAdapter';
import { CustomerPersistenceAdapter } from 'src/adapter/output/persistence/output/CustomerPersistenceAdapter';
import { ReceivablePersistenceAdapter } from 'src/adapter/output/persistence/output/ReceivablePersistenceAdapter';
import { RolePersistenceAdapter } from 'src/adapter/output/persistence/output/RolePersistenceAdapter';
import {
  RoleEntity,
  RoleSchema,
} from 'src/adapter/output/persistence/entities/RoleEntity';
import { UserService } from './services/UserService';
import { AuthService } from './services/AuthService';
import { CustomerService } from './services/CustomerService';
import { ReceivableService } from './services/ReceivableService';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserEntity.name, schema: UserSchema },
      { name: RoleEntity.name, schema: RoleSchema },
      { name: CustomerEntity.name, schema: CustomerSchema },
      { name: ReceivableEntity.name, schema: ReceivableSchema },
    ]),
  ],
  providers: [
    {
      provide: 'UserPersistence',
      useClass: UserPersistenceAdapter,
    },
    {
      provide: 'CustomerPersistence',
      useClass: CustomerPersistenceAdapter,
    },
    {
      provide: 'ReceivablePersistence',
      useClass: ReceivablePersistenceAdapter,
    },
    {
      provide: 'RolePersistence',
      useClass: RolePersistenceAdapter,
    },
    { provide: 'UserServiceInputPort', useClass: UserService },
    { provide: 'AuthServiceInputPort', useClass: AuthService },
    { provide: 'CustomerServiceInputPort', useClass: CustomerService },
    { provide: 'ReceivableServiceInputPort', useClass: ReceivableService },
  ],
  exports: [
    { provide: 'UserServiceInputPort', useClass: UserService },
    { provide: 'AuthServiceInputPort', useClass: AuthService },
    { provide: 'CustomerServiceInputPort', useClass: CustomerService },
    { provide: 'ReceivableServiceInputPort', useClass: ReceivableService },
  ],
})
export class ApplicationModule {}
