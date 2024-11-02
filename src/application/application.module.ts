import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/adapter/output/persistence/entities/UserEntity';
import { CustomerSchema } from 'src/adapter/output/persistence/entities/CustomerEntity';
import { RoleSchema } from 'src/adapter/output/persistence/entities/RoleEntity';
import { ReceivableSchema } from 'src/adapter/output/persistence/entities/ReceivableEntity';
import { UserPersistenceAdapter } from 'src/adapter/output/persistence/output/UserPersistenceAdapter';
import { CustomerPersistenceAdapter } from 'src/adapter/output/persistence/output/CustomerPersistenceAdapter';
import { ReceivablePersistenceAdapter } from 'src/adapter/output/persistence/output/ReceivablePersistenceAdapter';
import { RolePersistenceAdapter } from 'src/adapter/output/persistence/output/RolePersistenceAdapter';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserSchema },
      { name: RoleSchema.name, schema: RoleSchema },
      { name: CustomerSchema.name, schema: CustomerSchema },
      { name: ReceivableSchema.name, schema: ReceivableSchema },
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
  ],
  exports: [],
})
export class ApplicationModule {}
