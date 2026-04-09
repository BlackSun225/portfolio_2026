// scripts/sync-db.ts
import { sequelizeInstance } from '@/lib/sequelize'
import '../lib/db/models/Project' // import all your models so Sequelize knows about them

async function syncDatabase() {
  try {
    await sequelizeInstance.authenticate()
    console.log('✅ Database connected')
    
    await sequelizeInstance.sync({ force: false }) // force: false = don't drop existing tables
    console.log('✅ All tables created successfully')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Database sync failed:', error)
    process.exit(1)
  }
}

syncDatabase();