/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'


router.get('/', () => {
  return { message: 'Cron-Lite API v1.0.0 by dev-dv8' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.auth.NewAccount, 'store'])
        router.post('login', [controllers.auth.AccessTokens, 'store'])

        router.get('verify_reset_token', [controllers.auth.AccountManagements, 'verify_email_verification_token'])
        // router.post('verify_reset_token',[controllers.auth.AccountManagements,'verify_email_verification_token'])
        // router.post('forgot_password', [controllers.auth.AccountManagements, 'forgot_password'])
        // router.get('forgot_password', [controllers.auth.AccountManagements,'verify_reset_token'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.auth.Profile, 'show'])
        router.post('logout', [controllers.auth.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
    router.get('/emails/test', [controllers.Emails, 'testEmail'])
  })
  .prefix('/api/v1')
