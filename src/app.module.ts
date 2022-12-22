import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, ComplaintsModule,
    MongooseModule.forRoot('mongodb+srv://josepham:josepham@nestjs.mzhpmai.mongodb.net/NestJs?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
