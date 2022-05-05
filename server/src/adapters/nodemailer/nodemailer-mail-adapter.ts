import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b866a0ab6c2faa",
    pass: "e3328f9403d738"
  }
});

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({ subject, body }: SendMailData){
    await transport.sendMail({
    from: 'Equipe Dev <edson.malagodi12@gmail.com>',
    to: 'Edson Malagodi <edson.malagodi12@gmail.com>',
    subject,
    html: body,
  })

  }
}