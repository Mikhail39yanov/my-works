import 'dotenv/config.js'
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// Создать миграцию при помощи команды npx knex migrate:make add_country
// Обновить миграцию в БД npx knex migrate:latest
// Обновлять миграцию можно сколько угодно
// Откатить миграцию или все миграции из последней партии npx knex migrate:rollback

export default {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
  // connection: () => ({
  //   host: process.env.DB_HOST,
  //   port: Number(process.env.DB_PORT) || 5432,
  //   database: process.env.DB_NAME,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  // }),
  pool: {
    min: 0,
    max: 3,
  },
  // debug: true,
}
