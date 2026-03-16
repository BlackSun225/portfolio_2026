import { Sequelize } from 'sequelize';
import pg from 'pg';

// Check if pg is installed
try {
  require.resolve('pg');
  console.log('✅ PostgreSQL driver (pg) is installed');
} catch (error) {
  console.error('❌ PostgreSQL driver (pg) is NOT installed');
  console.error('Please run: pnpm add pg');
  throw new Error('Missing required dependency: pg');
}

// const sequelize = new Sequelize(process.env.DATABASE_URL!, {
//   dialect: 'postgres',
//   logging: process.env.NODE_ENV === 'development' ? console.log : false,
//   pool: {
//     max: 10,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// })

// Simple Sequelize instance with individual env vars
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


// Test the connection
async function testConnection() {
  try {
    await sequelizeInstance.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

testConnection();

export { sequelizeInstance };