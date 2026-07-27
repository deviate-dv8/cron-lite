import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import crypto from 'node:crypto'
import { DateTime } from 'luxon'

export default class NewAccountController {
  /**
  * @store
  * @description Creates User
  * @requestBody <signupValidator>
  */
  async store({ request, serialize }: HttpContext) {
    const { fullName, email, password } = await request.validateUsing(signupValidator)

    // Generates random string for token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex')

    const user = await User.create({
      fullName,
      email,
      password,
      emailVerifyToken: emailVerificationToken,
      emailVerifyExpiry: DateTime.now().plus({ hours: 24 })
    })

    const token = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }
}
