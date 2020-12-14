import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import {} from '@ioc:Adonis/Lucid/Factory'

export default class Deliveries extends BaseSchema {
  protected tableName = 'deliveries'

  public async up() {
    this.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"') // installs uuid_generate_v4() function
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .unique()
        .primary()
        .defaultTo(this.raw('uuid_generate_v4()'))
      table.string('client_name').notNullable()
      table.dateTime('date').notNullable()
      table.string('start').notNullable()
      table.string('destination').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
