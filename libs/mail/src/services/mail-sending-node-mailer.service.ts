import { IMailSendingService } from '../interfaces';
import { ConfigService } from '@nestjs/config';
import { ENVS } from 'libs/common/constants';
import * as nodemailer from 'nodemailer';

export class NodeMailerService implements IMailSendingService {
  private TO: string = null;
  private FROM: string = null;
  private SUBJECT: string = null;
  private TEXT: string = null;
  private SECRET_KEY: string = null;

  public constructor(private readonly configService: ConfigService) {}

  public to(email: string): IMailSendingService {
    this.TO = email;

    return this;
  }

  public subject(value: string): IMailSendingService {
    this.SUBJECT = value;

    return this;
  }

  public from(value: string) {
    this.FROM = value;

    return this;
  }

  public secretKey(value: string): IMailSendingService {
    this.SECRET_KEY = value;

    return this;
  }

  public text(value: string): IMailSendingService {
    this.TEXT = value;

    return this;
  }

  private getTransport(): nodemailer.Transporter {
    if (!this.FROM || !this.SECRET_KEY) {
      // If not provided, from or secretKey values, sent from our app email
      const user = this.configService.get<string>(ENVS.EMAIL);
      const pass = this.configService.get<string>(ENVS.EMAIL_PASSWORD);
      this.FROM = user;
      this.SECRET_KEY = pass;
    }

    return nodemailer.createTransport({
      service: 'Gmail',
      auth: { user: this.FROM, pass: this.SECRET_KEY },
    });
  }

  public async built() {
    const transporter = this.getTransport();

    const mailOptions: nodemailer.SendMailOptions = {
      from: this.FROM,
      to: this.TO,
      subject: this.SUBJECT,
      text: this.TEXT,
    };

    try {
      const response = await transporter.sendMail(mailOptions);

      return { status: true, data: { messageId: response.messageId } };
    } catch (error) {
      return { status: false, data: error };
    }
  }
}
