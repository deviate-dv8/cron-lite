import User from '#models/user'
import { verifyEmailVerificationTokenValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import { INVALID_EMAIL_VERICATION_TOKEN } from '../../constants/auth.ts'

export default class AccountManagementsController {
  async verify_email_verification_token({ request, serialize, response }: HttpContext) {
    const payload = await request.validateUsing(verifyEmailVerificationTokenValidator)
    const userByEmailToken = await User.findBy({
      email_verify_token: payload.token
    })
    if (!userByEmailToken) {
      return response.unauthorized(INVALID_EMAIL_VERICATION_TOKEN)
    }
    return serialize({
      // message: VALID_EMAIL_VERIFICATION_TOKEN,
      user: UserTransformer.transform(userByEmailToken)
    })
  }

  // async verify_reset_token({request}:HttpContext) {
  // }
  //
  // async forgot_password({request}:HttpContext) {
  //
  // }
  // async set_password({request}:HttpContext)) {
  // }
}
