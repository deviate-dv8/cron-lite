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
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    // returns swagger in YAML
    router.get("/swagger", async () => {
      return AutoSwagger.default.docs(router.toJSON(), swagger);
    });

    // Renders Swagger-UI and passes YAML-output of /swagger
    router.get("/docs", async () => {
      return AutoSwagger.default.ui("/api/v1/swagger", swagger);
      // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead. If you want, you can pass proxy url as second argument here.
      // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
    });
  })
  .prefix('/api/v1')
