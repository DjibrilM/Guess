import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { authModule } from './modules/authModule.module';
import { postModule } from './modules/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/guess'), authModule, postModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
