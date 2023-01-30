import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(@Res() response): string {
    response.cookie('value', 'key');
    return this.appService.getHello();
  }
}
