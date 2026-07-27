import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('email_verified').defaultTo(false)
      table.string("email_verify_token").index()
      table.datetime("email_verify_expiry")
      table.string("reset_token").index()
      table.datetime("reset_expiry")
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('email_verify_token','email_verify_expiry','reset_token','reset_expiry','email_verified')
    })
  }
}
