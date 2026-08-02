import env from "#start/env";
import mail from "@adonisjs/mail/services/main";

export class EmailService {
  async testMail() {
    return await mail.send((message) => {
      const self = env.get('MAIL_FROM_ADDRESS')
      message
        .to(self)
        .from(self)
        .subject('Hello Self')
        .htmlView('emails/test_mail')
    })
  }
  // Your code here
}
