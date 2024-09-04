import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import { createBodySchema } from './create-body'
import { createResponseSchema } from './create-response'
import { findAllQuerySchema } from './find-all-query'
import { findAllResponseSchema } from './find-all-response'

async function balancesHistoryLoader(server: FastifyInstance) {
  server.addSchema(createBodySchema)
  server.addSchema(createResponseSchema)
  server.addSchema(findAllQuerySchema)
  server.addSchema(findAllResponseSchema)
}

export default fp(balancesHistoryLoader)
