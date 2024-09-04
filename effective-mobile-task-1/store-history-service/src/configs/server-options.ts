import { FastifyServerOptions } from 'fastify'

export const serverOptions: FastifyServerOptions = {
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  }
}
