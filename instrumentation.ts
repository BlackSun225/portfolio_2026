export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { sequelizeInstance } = await import('./lib/sequelize')
    await import('./lib/db/models/Project')

    try {
      await sequelizeInstance.authenticate()
      console.log('✅ Database connected')

      await sequelizeInstance.sync({ force: false })
      console.log('✅ Tables synced')
    } catch (error) {
      console.error('❌ Database initialization failed:', error)
      throw error
    }
  }
}