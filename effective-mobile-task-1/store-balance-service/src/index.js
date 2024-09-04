import 'dotenv/config'
import closeWithGrace from 'close-with-grace'
import { build } from './build.js'
import { serverOptions } from './configs/server-options.js'

async function main() {
  const server = await build(serverOptions)

  server.listen({
    host: process.env.HOST,
    port: process.env.PORT
  })

  closeWithGrace(async ({ err }) => {
    if (err) {
      server.log.error(err, 'Server closed due error')
    } else {
      server.log.info('Shutting down server')
    }

    await server.close()
  })
}

main()
