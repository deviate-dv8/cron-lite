import { EmailService } from '#services/email_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'


@inject()
export default class EmailsController {
  constructor(protected emailService: EmailService) { }
  async testEmail({ response }: HttpContext) {
    await this.emailService.testMail()
    return response.ok({
      status: "success",
      message: "Test Email is sent successfully"
    })
  }
}
