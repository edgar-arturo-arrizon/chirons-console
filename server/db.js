import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: 'edgararrizon',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'chirons_system'
});

export default pool;