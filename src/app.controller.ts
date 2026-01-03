import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IngestionService } from './ingestion/ingestion.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ingestionService: IngestionService
  ) {}

  @Get()
  getHello(): string {
    this.ingestionService.ingestData('/path/to/data');
    return this.appService.getHello();
  }
}
