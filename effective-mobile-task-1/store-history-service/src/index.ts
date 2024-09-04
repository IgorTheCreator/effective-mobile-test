import 'dotenv/config'
import closeWithGrace from 'close-with-grace'
import { build } from './build'
import { serverOptions } from './configs'

async function main() {
  const server = await build(serverOptions)

  const HOST = process.env.HOST ? process.env.HOST : '127.0.0.1'
  const PORT = process.env.PORT ? +process.env.PORT : 3000
  server.listen({
    host: HOST,
    port: PORT
  })

  // Closing app gracefully
  closeWithGrace(async ({ err }) => {
    if (err) {
      server.log.error(err, 'Server closed due error')
    } else {
      server.log.info('Shutting down the server')
    }

    await server.close()
  })
}

main()
