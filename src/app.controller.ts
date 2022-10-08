import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Photo } from './entity/photo.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, 
    private readonly clientService: DataSource
    
    ) {}

  @Get()
  async getHello() {
    const a = await this.clientService.getRepository<Photo>(Photo).find();
    return a;
  }
}
