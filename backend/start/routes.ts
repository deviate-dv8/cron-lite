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

import AutoSwagger from "adonis-autoswagger";
import swagger from '#config/swagger'

router.get('/', () => {
  return { message: 'Cron-Lite API v1.0.0 by dev-dv8' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.auth.NewAccount, 'store'])
        router.post('login', [controllers.auth.AccessTokens, 'store'])

        router.get('verify_reset_token',[controllers.auth.AccountManagements,'verify_email_verification_token'])
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

  })
  .prefix('/api/v1')

  // returns swagger in YAML
  router.get("/swagger", async () => {
    return AutoSwagger.default.docs(router.toJSON(), swagger);
  });

  // Renders Swagger-UI and passes YAML-output of /swagger
  router.get("/docs", async () => {
    return AutoSwagger.default.ui("/swagger", swagger);
    // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead. If you want, you can pass proxy url as second argument here.
    // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
  });
