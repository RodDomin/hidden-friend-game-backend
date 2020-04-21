import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import MailConfig from '../config/mail';

interface Message {
  to: string;
  subject: string;
  text: string;
}

class MailService {
  transport: Mail;

  constructor() {
    this.transport = nodemailer.createTransport({
      host: MailConfig.host,
      port: MailConfig.port,
      auth: MailConfig.auth,
    });
  }

  sendMail(message: Message) {
    return this.transport.sendMail({
      from: '<test> <emailformytest2@gmail.com>',
      ...message,
    });
  }
}

export default new MailService();
