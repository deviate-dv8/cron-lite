import User from '#models/user'
import { verifyEmailVerificationTokenValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { INVALID_EMAIL_VERIFICATION_TOKEN, VALID_EMAIL_VERIFICATION_TOKEN } from '../../constants/auth.ts'
import UserTransformer from '#transformers/user_transformer'

export default class AccountManagementsController {

  /**
  * @verify_email_verification_token
  * @description Checks if verification token is valid
  * @paramQuery token - email verification token - @type(string) @required
  */
  async verify_email_verification_token({ request, serialize, response }: HttpContext) {
    const payload = await request.validateUsing(verifyEmailVerificationTokenValidator)
    const userByEmailToken = await User.findBy({
      email_verify_token: payload.token
    })
    if (!userByEmailToken) {
      return response.unauthorized({ message: INVALID_EMAIL_VERIFICATION_TOKEN })
    }
    return serialize({
      message: VALID_EMAIL_VERIFICATION_TOKEN,
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
