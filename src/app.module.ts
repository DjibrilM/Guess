import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authController } from './controllers/auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { authModule } from './modules/authModule.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/guess'), authModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
