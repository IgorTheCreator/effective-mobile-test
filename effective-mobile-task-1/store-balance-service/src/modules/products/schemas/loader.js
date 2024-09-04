import fp from 'fastify-plugin'
import { createBodySchema } from './create-body.js'
import { createResponseSchema } from './create-reponse.js'
import { findPluSchema } from './find-plu.js'
import { findResponseSchema } from './find-response.js'
import { findAllQuerySchema } from './find-all-query.js'
import { findAllResponseSchema } from './find-all-reponse.js'

async function productsLoader(server) {
  server.addSchema(createBodySchema)
  server.addSchema(createResponseSchema)
  server.addSchema(findPluSchema)
  server.addSchema(findResponseSchema)
  server.addSchema(findAllQuerySchema)
  server.addSchema(findAllResponseSchema)
}

export default fp(productsLoader)
