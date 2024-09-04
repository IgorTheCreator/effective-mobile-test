import { join } from 'node:path'
import Fastify from 'fastify'
import AutoLoad from '@fastify/autoload'

export async function build(options = {}) {
  const app = Fastify(options)

  // Autoload plugins from 'plugins' folder
  app.register(AutoLoad, {
    dir: join(import.meta.dirname, 'plugins')
  })

  // Autoload routes from 'modules' folder
  app.register(AutoLoad, {
    dir: join(import.meta.dirname, 'modules'),
    indexPattern: /.*routes(\.js|\.cjs)$/i,
    ignorePattern: /.*\.js/,
    autoHooksPattern: /.*hooks(\.js|\.cjs)$/i,
    autoHooks: true,
    cascadeHooks: true
  })

  return app
}
