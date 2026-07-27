import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})

//
// Shared rules for email verification and forgot password tokens
//
const verification_token = () => vine.string()

export const forgotPasswordValidator = vine.create({
  email: email()
})

export const verifyForgotPasswordTokenValidator = vine.create({
  token:verification_token()
})

export const verifyEmailVerificationTokenValidator = vine.create({
  token:verification_token()
})

export const resetPasswordValidator = vine.create({
  token:verification_token(),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})
