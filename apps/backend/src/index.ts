import { buildApp } from './app.js'
import { config } from './config.js'
import { runMigrations } from './db/migrate.js'
import { closeDb } from './db/index.js'

async function start() {
  const app = await buildApp()

  await runMigrations()

  try {
    await app.listen({ port: config.PORT, host: config.HOST })
  } catch (err) {
    app.log.error(err)
    await closeDb()
    process.exit(1)
  }

  const shutdown = async (signal: string) => {
    app.log.info({ signal }, 'Shutting down')
    await app.close()
    await closeDb()
    process.exit(0)
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
}

start()
