export interface IMailSendingService {
  from(email: string): IMailSendingService;
  secretKey(value: string): IMailSendingService;
  to(email: string): IMailSendingService;
  text(value: string): IMailSendingService;
  subject(value: string): IMailSendingService;
  built(): Promise<{ status: boolean; data: object }>;
}
