/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('timers', (table) => {
    table.string('id', 21).notNullable().unique().primary()
    table.string('user_id').notNullable()
    table.foreign('user_id').references('users.id')
    table.boolean('is_active').defaultTo(false)
    table.string('description').notNullable()
    table.bigInteger('start').defaultTo(Date.now())
    table.bigInteger('end').defaultTo(0)
    table.bigInteger('duration').defaultTo(0)
    table.bigInteger('progress').defaultTo(0)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('timers')
}
