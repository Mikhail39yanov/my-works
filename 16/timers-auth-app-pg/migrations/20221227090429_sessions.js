/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('sessions', (table) => {
    table.string('id', 21).notNullable().unique().primary()
    table.string('user_id').notNullable()
    table.foreign('user_id').references('users.id')
    table.string('session_id').notNullable().unique()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('sessions')
}
