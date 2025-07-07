import { Pool } from 'pg'

new Pool ({
  user: 'postgres',
  password: 'DB_PASSWORD',
  host: 'localhost',
  port: 5432,
  database: 'Tasks Project'
})