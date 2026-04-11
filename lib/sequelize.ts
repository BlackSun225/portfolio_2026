import { Sequelize } from 'sequelize';
import pg from 'pg';

// Check if pg is installed
try {
  require.resolve('pg');
  console.log('✅ PostgreSQL driver (pg) is installed');
} catch (error) {
  console.error('❌ PostgreSQL driver (pg) is NOT installed : ', error);
  console.error('Please run: pnpm add pg');
  throw new Error('Missing required dependency: pg');
}


const sequelizeInstance = new Sequelize(
  process.env.DB_NAME || 'portfolio_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    dialectModule: pg,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  }
);

export { sequelizeInstance };