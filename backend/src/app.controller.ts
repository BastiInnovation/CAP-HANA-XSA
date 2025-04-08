import { Controller} from '@nestjs/common';
import { AppService } from './app.service';

/** Main Controller */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { 
    

  }
}
