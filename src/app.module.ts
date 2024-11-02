import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationModule } from './application/application.module';
import { AdapterModule } from './adapter/adapter.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:12345678@localhost:27017/finance-sync',
    ),
    ApplicationModule,
    AdapterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
