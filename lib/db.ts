// lib/db.ts
import { sequelizeInstance } from './sequelize'
import Project from './db/models/Project'

// Export models
export { Project }

// Database connection function
export async function connectToDatabase() {
  try {
    await sequelizeInstance.authenticate()
    console.log('✅ Database connected successfully')
    
    // Sync models with database (in development)
    if (process.env.NODE_ENV === 'development') {
      await sequelizeInstance.sync({ alter: true })
      console.log('📊 Database synced')
    }else{
      await sequelizeInstance.sync();
    }
    
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    }
    return false
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await sequelizeInstance.close()
  console.log('👋 Database connection closed')
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await sequelizeInstance.close()
  console.log('👋 Database connection closed')
  process.exit(0)
})

export default sequelizeInstance