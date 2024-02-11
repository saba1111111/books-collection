import { Injectable } from '@nestjs/common';
import { NodeMailerService } from './mail-sending-node-mailer.service';
import { ConfigService } from '@nestjs/config';
import { IMailSendingService } from '../interfaces';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  public sendMessage(): IMailSendingService {
    return new NodeMailerService(this.configService);
  }
}
