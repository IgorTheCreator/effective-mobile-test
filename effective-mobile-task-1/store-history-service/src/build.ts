import { join } from 'node:path'
import Fastify from 'fastify'
import AutoLoad from '@fastify/autoload'

export async function build(options = {}) {
  const app = Fastify(options)

  // Autoload plugins from 'plugins' folder
  app.register(AutoLoad, {
    dir: join(__dirname, 'plugins')
  })

  // Autoload routes from 'modules' folder
  app.register(AutoLoad, {
    dir: join(__dirname, 'modules'),
    indexPattern: /.*routes(\.js|\.cjs|\.ts)$/i,
    ignorePattern: /.*(\.js|\.cjs|\.ts)$/i,
    autoHooksPattern: /.*hooks(\.js|\.cjs|\.ts)$/i,
    autoHooks: true,
    cascadeHooks: true
  })

  return app
}
