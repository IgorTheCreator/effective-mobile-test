import fp from 'fastify-plugin'
import { createBodySchema } from './create-body.js'
import { createResponseSchema } from './create-response.js'
import { findAllQuerySchema } from './find-all-query.js'
import { findAllResponseSchema } from './find-all-response.js'
import { updateParamsSchema } from './update-params.js'
import { updateBodySchema } from './update-body.js'
import { updateResponseSchema } from './update-response.js'

async function balancesLoader(server) {
  server.addSchema(createBodySchema)
  server.addSchema(createResponseSchema)
  server.addSchema(findAllQuerySchema)
  server.addSchema(findAllResponseSchema)
  server.addSchema(updateParamsSchema)
  server.addSchema(updateBodySchema)
  server.addSchema(updateResponseSchema)
}

export default fp(balancesLoader)
